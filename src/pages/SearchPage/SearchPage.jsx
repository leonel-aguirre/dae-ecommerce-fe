import "./SearchPage.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { productActions, productSelectors } from "../../state/index"
import ProductCard from "../../components/ProductCard/ProductCard"

const { fetchSearchResults } = productActions
const { selectSearchResults } = productSelectors

const SearchPage = () => {
  const searchResults = useSelector(selectSearchResults)
  const dispatch = useDispatch()
  const [params] = useSearchParams()

  const searchTerm = params.get("term")

  useEffect(() => {
    dispatch(fetchSearchResults())
  }, [])

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
      <section className="search-page__search-results-section">
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} isSmall={true} />
        ))}
      </section>
    </div>
  )
}

export default SearchPage
