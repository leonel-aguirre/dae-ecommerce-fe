import "./ProductCard.scss"

import React from "react"
import PropTypes from "prop-types"
import {
  faCartShopping,
  faImage,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

import Button from "../Button/Button"
import { productActions } from "../../state/index"

const { deleteUserProduct } = productActions

const ProductCard = ({ product, isSmall = false, isOwned = false }) => {
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
      {isOwned ? (
        <>
          <div className="product-card__add-to-cart-button-wrapper">
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
          </div>
        </>
      ) : (
        <div className="product-card__add-to-cart-button-wrapper">
          <Button text={"Add to Cart"} icon={faCartShopping} />
        </div>
      )}
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isSmall: PropTypes.bool,
  isOwned: PropTypes.bool,
}

export default ProductCard
