import "./SearchPage.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { productActions, productSelectors } from "../../state/index"
import ProductCard from "../../components/ProductCard/ProductCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

const { fetchSearchResults } = productActions
const { selectSearchResults } = productSelectors

const SearchPage = () => {
  const searchResults = useSelector(selectSearchResults)
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const searchTerm = params.get("term")

  useEffect(() => {
    const triggerFetch = async () => {
      setIsLoading(true)
      await dispatch(fetchSearchResults(searchTerm, null))
      setIsLoading(false)
    }

    triggerFetch()
  }, [searchTerm])

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
        <section className="search-page__search-results-section">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} isSmall={true} />
          ))}
          {searchResults.length === 0 && (
            <p className="search-page__no-results-text">
              <span className="search-page__no-results-icon">😿</span>
              Oops, no products found matching your search. Please try different
              keywords.
            </p>
          )}
        </section>
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
