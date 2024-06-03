import "./UserProductsPage.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { faAdd, faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ProductCard from "../../components/ProductCard/ProductCard"
import {
  authSelectors,
  productActions,
  productSelectors,
} from "../../state/index"
import { URL_LOG_IN_PAGE } from "../../constants"
import Button from "../../components/Button/Button"

const { fetchUserProducts } = productActions
const { selectUserProducts } = productSelectors
const { selectIsUserAuthenticated } = authSelectors

const UserProductsPage = () => {
  const userProducts = useSelector(selectUserProducts)
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const handleAddProductButton = () => {
    navigate("/add-product")
  }

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
          {userProducts.map((product, index) => (
            <>
              <ProductCard
                key={product.id}
                product={product}
                isSmall={true}
                type={ProductCard.TYPE_OWNED}
              />
              {index < userProducts.length - 1 && (
                <div className="user-products-page__item-divider-wrapper">
                  <div className="user-products-page__item-divider" />
                </div>
              )}
            </>
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
      <section className="user-products-page__actions-section">
        <div className="user-products-page__actions-section-container">
          <div className="user-products-page__buttons-wrapper">
            <Button
              text={"Add Product"}
              icon={faAdd}
              onClick={handleAddProductButton}
            />
          </div>
        </div>
      </section>
      {renderResults()}
    </div>
  )
}

export default UserProductsPage
