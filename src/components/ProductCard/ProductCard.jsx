import "./ProductCard.scss"

import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  faCartShopping,
  faImage,
  faPenToSquare,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

import Button from "../Button/Button"
import {
  authSelectors,
  productActions,
  productSelectors,
} from "../../state/index"
import ProductRating from "../ProductRating/ProductRating"
import Modal from "../Modal/Modal"
import ProductRatingForm from "./ProductRatingForm/ProductRatingForm"

const {
  deleteUserProduct,
  addProductToCart,
  deleteCartItem,
  fetchUserProductRatings,
} = productActions
const { selectIsUserAuthenticated } = authSelectors
const { selectUserProductRatings } = productSelectors

const ProductCard = ({
  product,
  isSmall = false,
  type = "TYPE_DEFAULT",
  cartItemID,
  purchaseDate,
}) => {
  const userProductRatings = useSelector(selectUserProductRatings)
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isProductRatingModalOpen, setIsProductRatingModalOpen] =
    useState(false)

  const productImageID = product?.productImages?.[0]?.id
  const productTitle = product?.title
  const productDescription = product?.description
  const productTags = product?.tags
  const productCurrentPrice = product?.currentPrice
  const productPreviousPrice = product?.previousPrice
  const productID = product?.id

  const [productRating] = userProductRatings.filter(
    (productRating) => productRating.productId === productID,
  )
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

  const handleRateThisItemButton = () => {
    setIsProductRatingModalOpen(true)
  }

  const renderButtons = () => {
    let formattedDate

    if (purchaseDate) {
      const timestamp = purchaseDate
      const date = new Date(timestamp)

      const options = {
        timeZone: "America/Mexico_City",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }

      formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)
    }

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
      case ProductCard.TYPE_PURCHASED:
        return (
          <>
            {productRating ? (
              <div className="product-card__product-rating-wrapper">
                <p className="product-card__product-rating-label">
                  Your Rating
                </p>
                <ProductRating value={productRating?.rating} isSmall={true} />
              </div>
            ) : (
              <Button
                text={"Rate this Item"}
                icon={faStar}
                onClick={handleRateThisItemButton}
              />
            )}
            <div className="product-card__purchased-date-wrapper">
              <p className="product-card__purchased-date-label">Purchased On</p>
              <p className="product-card__purchased-date-text">
                {formattedDate}
              </p>
            </div>
          </>
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

  const renderModal = () => {
    if (type !== ProductCard.TYPE_PURCHASED || productRating) {
      return null
    }

    return (
      <Modal
        isOpen={isProductRatingModalOpen}
        onClose={() => setIsProductRatingModalOpen(false)}
      >
        <ProductRatingForm
          productID={productID}
          onSubmit={async () => {
            setIsProductRatingModalOpen(false)
            document.body.classList.remove("is-modal-open")
            await dispatch(fetchUserProductRatings())
          }}
        />
      </Modal>
    )
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
        {type !== ProductCard.TYPE_PURCHASED && (
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
        )}
      </div>
      <div className="product-card__action-buttons-wrapper">
        {renderButtons()}
      </div>
      {renderModal()}
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isSmall: PropTypes.bool,
  type: PropTypes.string,
  cartItemID: PropTypes.string,
  purchaseDate: PropTypes.string,
}

ProductCard.TYPE_DEFAULT = "TYPE_DEFAULT"
ProductCard.TYPE_OWNED = "TYPE_OWNED"
ProductCard.TYPE_CART = "TYPE_CART"
ProductCard.TYPE_PURCHASED = "TYPE_PURCHASED"

export default ProductCard
