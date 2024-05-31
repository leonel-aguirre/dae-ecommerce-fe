import "./SearchPage.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"

import { faCircleNotch, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ProductCard from "../../components/ProductCard/ProductCard"
import { productActions, productSelectors } from "../../state/index"

const { fetchSearchResults, fetchProductCategories } = productActions
const { selectSearchResults, selectProductCategories } = productSelectors

const SearchPage = () => {
  const searchResults = useSelector(selectSearchResults)
  const productCategories = useSelector(selectProductCategories)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const searchTerm = params.get("term")
  const filter = params.get("filter")

  useEffect(() => {
    const triggerFetch = async () => {
      setIsLoading(true)
      await dispatch(fetchProductCategories())
      await dispatch(
        fetchSearchResults(
          searchTerm,
          filter?.replaceAll("-and-", "&") || null,
        ),
      )
      setIsLoading(false)
    }

    triggerFetch()
  }, [searchTerm, filter])

  const handleFilterButtonClick = (category) => {
    const formattedCategory = category?.replaceAll("&", "-and-")

    if (searchTerm) {
      navigate(`/search?term=${searchTerm}&filter=${formattedCategory}`)
    } else {
      navigate(`/search?filter=${formattedCategory}`)
    }
  }

  const renderResults = () => {
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
          <section className="search-page__search-filters-section">
            <ul className="search-page__filters-list">
              {productCategories.map((productCategory) => {
                const { id, title } = productCategory
                const currentFilter = filter?.replaceAll("-and-", "&") || ""

                return (
                  <li key={id} className="search-page__filters-list-item">
                    <button
                      disabled={title === currentFilter}
                      className="search-page__filter-button"
                      onClick={() => handleFilterButtonClick(title)}
                    >
                      {title}
                    </button>
                  </li>
                )
              })}
              <li>
                <button
                  className="search-page__filter-button is-clear-button"
                  onClick={() =>
                    navigate(
                      `/search${searchTerm ? "?term=" + searchTerm : ""}`,
                    )
                  }
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </li>
            </ul>
          </section>
          <section className="search-page__search-results-section">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} isSmall={true} />
            ))}
            {searchResults.length === 0 && (
              <p className="search-page__no-results-text">
                <span className="search-page__no-results-icon">😿</span>
                Oops, no products found matching your search. Please try
                different keywords.
              </p>
            )}
          </section>
        </>
      )
    }
  }

  return (
    <div className="search-page">
      <section className="search-page__search-term-section">
        <div className="search-page__search-term-section-container">
          <p className="search-page__search-term-text">
            {searchTerm
              ? `Showing results for "${searchTerm}".`
              : "Showing all products."}
          </p>
        </div>
      </section>
      {renderResults()}
    </div>
  )
}

export default SearchPage
