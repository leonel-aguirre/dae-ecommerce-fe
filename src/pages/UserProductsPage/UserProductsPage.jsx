import "./UserProductsPage.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ProductCard from "../../components/ProductCard/ProductCard"
import {
  authSelectors,
  productActions,
  productSelectors,
} from "../../state/index"
import { URL_LOG_IN_PAGE } from "../../constants"

const { fetchUserProducts } = productActions
const { selectUserProducts } = productSelectors
const { selectIsUserAuthenticated } = authSelectors

const UserProductsPage = () => {
  const userProducts = useSelector(selectUserProducts)
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const triggerFetch = async () => {
      if (isUserAuthenticated) {
        setIsLoading(true)
        await dispatch(fetchUserProducts())
        setIsLoading(false)
      } else {
        navigate(URL_LOG_IN_PAGE)
      }
    }

    triggerFetch()
  }, [])

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className="user-products-page__loader-container">
          <FontAwesomeIcon
            className="user-products-page__loader-icon"
            icon={faCircleNotch}
            spin
          />
        </div>
      )
    } else {
      return (
        <section className="user-products-page__products-list-section">
          {userProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSmall={true}
              isOwned={true}
            />
          ))}
          {userProducts.length === 0 && (
            <p className="user-products-page__no-results-text">
              <span className="user-products-page__no-results-icon">😿</span>
              Oops, No products found. Please try adding some.
            </p>
          )}
        </section>
      )
    }
  }

  return (
    <div className="user-products-page">
      <section className="user-products-page__header-section">
        <div className="user-products-page__header-section-container">
          <p className="user-products-page__header-text">Your Products</p>
        </div>
      </section>
      {renderResults()}
    </div>
  )
}

export default UserProductsPage
