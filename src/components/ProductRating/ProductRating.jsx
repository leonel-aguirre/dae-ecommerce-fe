import "./ProductRating.scss"

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as faStarHollow } from "@fortawesome/free-regular-svg-icons"

const ProductRating = ({ value, isSmall = false }) => {
  const [iconList, setIconList] = useState([])

  useEffect(() => {
    const list = []

    for (let i = 0; i <= value; i++) {
      if (i % 2 == 0 && i !== 0) {
        list.push(ProductRating.ICON_FULL_STAR)
      }
    }

    if (value % 2 !== 0) {
      list.push(ProductRating.ICON_HALF_STAR)
    }

    while (list.length < 5) {
      list.push(ProductRating.ICON_HOLLOW_STAR)
    }

    setIconList(list)
  }, [value])

  return (
    <div className="product-rating">
      {iconList.map((icon) => {
        switch (icon) {
          case ProductRating.ICON_FULL_STAR:
            return (
              <FontAwesomeIcon
                className="product-rating__icon"
                size={isSmall ? "1x" : "2x"}
                icon={faStar}
              />
            )
          case ProductRating.ICON_HALF_STAR:
            return (
              <FontAwesomeIcon
                className="product-rating__icon"
                size={isSmall ? "1x" : "2x"}
                icon={faStarHalfStroke}
              />
            )
          case ProductRating.ICON_HOLLOW_STAR:
            return (
              <FontAwesomeIcon
                className="product-rating__icon"
                size={isSmall ? "1x" : "2x"}
                icon={faStarHollow}
              />
            )
        }
      })}
    </div>
  )
}

ProductRating.propTypes = {
  value: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
}

ProductRating.ICON_FULL_STAR = "ICON_FULL_STAR"
ProductRating.ICON_HALF_STAR = "ICON_HALF_STAR"
ProductRating.ICON_HOLLOW_STAR = "ICON_HOLLOW_STAR"

export default ProductRating
