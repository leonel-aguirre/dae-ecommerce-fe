import "./ProductCard.scss"

import React from "react"
import PropTypes from "prop-types"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

import Button from "../Button/Button"

const ProductCard = ({ product }) => {
  const productImageID = product?.productImages?.[0]?.id
  const productTitle = product?.title
  const productDescription = product?.description
  const productTags = product?.tags
  const productCurrentPrice = product?.currentPrice
  const productPreviousPrice = product?.previousPrice

  const shouldShowPreviousPrice = productCurrentPrice < productPreviousPrice

  return (
    <div className="product-card">
      <img
        className="product-card__image"
        src={`http://localhost:4000/api/products/image/${productImageID}`}
      />
      <div className="product-card__product-information">
        <p className="product-card__product-title">{productTitle}</p>
        <p className="product-card__product-description">
          {productDescription}
        </p>
        <ul className="product-card__product-tags-list">
          {productTags.map((tag) => {
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
        <div className="product-card__add-to-cart-button-wrapper">
          <Button text={"Add to Cart"} icon={faCartShopping} />
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductCard
