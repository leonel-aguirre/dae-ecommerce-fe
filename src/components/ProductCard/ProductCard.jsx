import "./ProductCard.scss"

import React from "react"
import PropTypes from "prop-types"
import {
  faCartShopping,
  faImage,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

import Button from "../Button/Button"
import { authSelectors, productActions } from "../../state/index"

const { deleteUserProduct, addProductToCart, deleteCartItem } = productActions
const { selectIsUserAuthenticated } = authSelectors

const ProductCard = ({
  product,
  isSmall = false,
  type = "TYPE_DEFAULT",
  cartItemID,
}) => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productImageID = product?.productImages?.[0]?.id
  const productTitle = product?.title
  const productDescription = product?.description
  const productTags = product?.tags
  const productCurrentPrice = product?.currentPrice
  const productPreviousPrice = product?.previousPrice
  const productID = product?.id

  const shouldShowPreviousPrice = productCurrentPrice < productPreviousPrice

  const handleDeleteButton = () => {
    dispatch(deleteUserProduct(productID))
  }

  const handleEditButton = () => {
    navigate(`/edit-product/${productID}`)
  }

  const handleAddToCartButton = () => {
    dispatch(addProductToCart(productID))
  }

  const handleDeleteFromCartButton = () => {
    if (cartItemID) {
      dispatch(deleteCartItem(cartItemID))
    }
  }

  const renderButtons = () => {
    switch (type) {
      case ProductCard.TYPE_OWNED:
        return (
          <>
            <Button
              text={"Delete"}
              icon={faTrash}
              onClick={handleDeleteButton}
            />
            <Button
              text={"Edit"}
              icon={faPenToSquare}
              onClick={handleEditButton}
            />
          </>
        )
      case ProductCard.TYPE_CART:
        return (
          <Button
            text={"Delete"}
            icon={faTrash}
            onClick={handleDeleteFromCartButton}
          />
        )
      case ProductCard.TYPE_DEFAULT:
      default:
        return (
          <Button
            text={"Add to Cart"}
            icon={faCartShopping}
            onClick={handleAddToCartButton}
            isDisabled={!isUserAuthenticated}
          />
        )
    }
  }

  return (
    <div className={`product-card ${isSmall ? "is-small" : ""}`}>
      <div className="product-card__image-wrapper">
        {productImageID ? (
          <img
            className={`product-card__image ${isSmall ? "is-small" : ""}`}
            src={`http://localhost:4000/api/products/image/${productImageID}`}
          />
        ) : (
          <div
            className={`product-card__no-image ${isSmall ? "is-small" : ""}`}
          >
            <FontAwesomeIcon
              icon={faImage}
              className="product-card__no-image-icon"
            />
          </div>
        )}
      </div>
      <div className="product-card__product-information">
        <p className="product-card__product-title">{productTitle}</p>
        <p className="product-card__product-description">
          {productDescription}
        </p>
        <ul className="product-card__product-tags-list">
          {productTags?.map((tag) => {
            return (
              <li className="product-card__product-tag" key={tag}>
                {tag}
              </li>
            )
          })}
        </ul>
        <div className="product-card__product-pricing">
          {shouldShowPreviousPrice && (
            <s className="product-card__product-previous-price">
              $ {productPreviousPrice}
            </s>
          )}
          <p className="product-card__product-current-price">
            $ {productCurrentPrice}
          </p>
        </div>
      </div>
      <div className="product-card__action-buttons-wrapper">
        {renderButtons()}
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isSmall: PropTypes.bool,
  type: PropTypes.string,
  cartItemID: PropTypes.string,
}

ProductCard.TYPE_DEFAULT = "TYPE_DEFAULT"
ProductCard.TYPE_OWNED = "TYPE_OWNED"
ProductCard.TYPE_CART = "TYPE_CART"

export default ProductCard
