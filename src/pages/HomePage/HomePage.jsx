import "./HomePage.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { productActions, productSelectors } from "../../state/index"
import ProductCard from "../../components/ProductCard/ProductCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

const { fetchProductCategories, fetchFeaturedProduct } = productActions
const { selectProductCategories } = productSelectors

const HomePage = () => {
  const productCategories = useSelector(selectProductCategories)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const triggerFetch = async () => {
      setIsLoading(true)

      try {
        const { success, data } = await dispatch(fetchFeaturedProduct())

        if (success && data) {
          setFeaturedProduct(data)
        }

        await dispatch(fetchProductCategories())
      } finally {
        setIsLoading(false)
      }
    }

    triggerFetch()
  }, [])

  const handleCategoryButtonClick = (url) => {
    navigate(url)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="search-page__loader-container">
          <FontAwesomeIcon
            className="search-page__loader-icon"
            icon={faCircleNotch}
            spin
          />
        </div>
      )
    } else {
      return (
        <>
          {featuredProduct && (
            <section className="home-page__featured-item-section">
              <h2 className="home-page__featured-section-heading">
                Featured{" "}
                <span className="home-page__section-heading-highlight">
                  Product:
                </span>
              </h2>
              <div className="home-page__featured-product-card">
                <ProductCard product={featuredProduct} />
              </div>
            </section>
          )}
          <section className="home-page__items-by-category-section">
            <h2 className="home-page__section-heading">
              Discover Your{" "}
              <span className="home-page__section-heading-highlight">
                Perfect Item
              </span>
            </h2>
            <p className="home-page__section-paragraph">
              Find the item you&apos;re looking for from the following
              categories:
            </p>
            <ul className="home-page__categories-list">
              {productCategories.map((productCategory, index) => {
                const { id, title } = productCategory

                const colorType = String.fromCharCode(97 + (index % 3))

                return (
                  <li key={id} className="home-page__categories-list-item">
                    <button
                      className={`home-page__category-button is-color-${colorType}`}
                      onClick={() =>
                        handleCategoryButtonClick(
                          `/search?filter=${title?.replaceAll("&", "-and-")}`,
                        )
                      }
                    >
                      {title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        </>
      )
    }
  }

  return (
    <div className="home-page">
      <div className="home-page__container">{renderContent()}</div>
    </div>
  )
}

export default HomePage
