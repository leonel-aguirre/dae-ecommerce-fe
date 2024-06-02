import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./PurchasedItemsPage.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

import ProductCard from "../../components/ProductCard/ProductCard"
import { URL_LOG_IN_PAGE } from "../../constants"
import { authSelectors, productActions } from "../../state"

const { selectIsUserAuthenticated } = authSelectors
const { fetchPurchasedItems } = productActions

const PurchasedItemsPage = () => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [purchasedItems, setPurchasedItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const triggerFetch = async () => {
      if (isUserAuthenticated) {
        setIsLoading(true)

        try {
          const { success, data } = await dispatch(fetchPurchasedItems())

          if (success) {
            setPurchasedItems(data)
          }
        } finally {
          setIsLoading(false)
        }
      } else {
        navigate(URL_LOG_IN_PAGE)
      }
    }

    triggerFetch()
  }, [])

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className="purchased-items-page__loader-container">
          <FontAwesomeIcon
            className="purchased-items-page__loader-icon"
            icon={faCircleNotch}
            spin
          />
        </div>
      )
    } else {
      return (
        <section className="purchased-items-page__products-list-section">
          {purchasedItems.map((purchasedItem) => (
            <ProductCard
              key={purchasedItem.id}
              product={purchasedItem.product}
              cartItemID={purchasedItem.id}
              purchaseDate={purchasedItem.purchaseDate}
              isSmall={true}
              type={ProductCard.TYPE_PURCHASED}
            />
          ))}
          {purchasedItems.length === 0 && (
            <p className="purchased-items-page__no-results-text">
              <span className="purchased-items-page__no-results-icon">😿</span>
              Oops, No products found. Please try adding some.
            </p>
          )}
        </section>
      )
    }
  }

  return (
    <div className="purchased-items-page">
      <section className="purchased-items-page__header-section">
        <div className="purchased-items-page__header-section-container">
          <p className="purchased-items-page__header-text">
            Your Purchased Items
          </p>
        </div>
      </section>
      {renderResults()}
    </div>
  )
}

export default PurchasedItemsPage
