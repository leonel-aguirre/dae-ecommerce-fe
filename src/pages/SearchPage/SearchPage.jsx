import "./SearchPage.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { productActions, productSelectors } from "../../state/index"
import ProductCard from "../../components/ProductCard/ProductCard"

const { fetchSearchResults } = productActions
const { selectSearchResults } = productSelectors

const SearchPage = () => {
  const searchResults = useSelector(selectSearchResults)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSearchResults())
  }, [])

  return (
    <div className="search-page">
      <section className="search-page__search-results-section">
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} isSmall={true} />
        ))}
      </section>
      {/* <section className="search-page__featured-item-section">
        <h2 className="search-page__featured-section-heading">
          Featured{" "}
          <span className="search-page__section-heading-highlight">
            Product:
          </span>
        </h2>
        <div className="search-page__featured-product-card">
          <ProductCard product={featuredProduct} />
        </div>
      </section>
      <section className="search-page__items-by-category-section">
        <h2 className="search-page__section-heading">
          Discover Your{" "}
          <span className="search-page__section-heading-highlight">
            Perfect Item
          </span>
        </h2>
        <p className="search-page__section-paragraph">
          Find the item you&apos;re looking for from the following categories:
        </p>
        <ul className="search-page__categories-list">
          {productCategories.map((productCategory, index) => {
            const { id, title } = productCategory

            const colorType = String.fromCharCode(97 + (index % 3))

            return (
              <li key={id} className="search-page__categories-list-item">
                <button
                  className={`search-page__category-button is-color-${colorType}`}
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
      </section> */}
    </div>
  )
}

export default SearchPage
