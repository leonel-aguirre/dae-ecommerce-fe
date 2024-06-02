import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./ProductRating.scss"

import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarHollow } from "@fortawesome/free-regular-svg-icons"

const ProductRating = ({ value }) => {
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
            return <FontAwesomeIcon icon={faStar} />
          case ProductRating.ICON_HALF_STAR:
            return <FontAwesomeIcon icon={faStarHalfStroke} />
          case ProductRating.ICON_HOLLOW_STAR:
            return <FontAwesomeIcon icon={faStarHollow} />
        }
      })}
    </div>
  )
}

ProductRating.propTypes = {
  value: PropTypes.string.isRequired,
}

ProductRating.ICON_FULL_STAR = "ICON_FULL_STAR"
ProductRating.ICON_HALF_STAR = "ICON_HALF_STAR"
ProductRating.ICON_HOLLOW_STAR = "ICON_HOLLOW_STAR"

export default ProductRating
