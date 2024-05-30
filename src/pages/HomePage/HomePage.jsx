import "./HomePage.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { productActions, productSelectors } from "../../state/index"
import ProductCard from "../../components/ProductCard/ProductCard"

const { fetchProductCategories, fetchFeaturedProduct } = productActions
const { selectProductCategories, selectFeaturedProduct } = productSelectors

const HomePage = () => {
  const featuredProduct = useSelector(selectFeaturedProduct)
  const productCategories = useSelector(selectProductCategories)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchFeaturedProduct())
    dispatch(fetchProductCategories())
  }, [])

  const handleCategoryButtonClick = (url) => {
    navigate(url)
  }

  return (
    <div className="home-page">
      <section className="home-page__featured-item-section">
        <h2 className="home-page__featured-section-heading">
          Featured{" "}
          <span className="home-page__section-heading-highlight">Product:</span>
        </h2>
        <div className="home-page__featured-product-card">
          <ProductCard product={featuredProduct} />
        </div>
      </section>
      <section className="home-page__items-by-category-section">
        <h2 className="home-page__section-heading">
          Discover Your{" "}
          <span className="home-page__section-heading-highlight">
            Perfect Item
          </span>
        </h2>
        <p className="home-page__section-paragraph">
          Find the item you&apos;re looking for from the following categories:
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
                    handleCategoryButtonClick(`/search?category=${title}`)
                  }
                >
                  {title}
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default HomePage
