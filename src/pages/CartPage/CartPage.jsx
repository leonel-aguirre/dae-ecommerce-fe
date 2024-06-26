import "./CartPage.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  faCircleNotch,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ProductCard from "../../components/ProductCard/ProductCard"
import {
  authSelectors,
  productActions,
  productSelectors,
} from "../../state/index"
import { URL_LOG_IN_PAGE } from "../../constants"
import Button from "../../components/Button/Button"

const { fetchCartItems, purchaseItems, setCartItemsAmount } = productActions
const { selectIsUserAuthenticated } = authSelectors
const { selectCartItems, selectCartItemsAmount } = productSelectors

const CartPage = () => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const cartItemsAmount = useSelector(selectCartItemsAmount)
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const handlePurchasedItemsButton = () => {
    navigate("/purchased-items")
  }

  const handleProceedToCheckoutButton = async () => {
    const cartItemsIDs = cartItems.map(({ id }) => id)

    setIsLoading(true)

    try {
      const { success } = await dispatch(purchaseItems(cartItemsIDs))

      if (success) {
        dispatch(setCartItemsAmount(0))
        navigate("/purchased-items")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const triggerFetch = async () => {
      if (isUserAuthenticated) {
        setIsLoading(true)

        try {
          await dispatch(fetchCartItems())
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
        <div className="cart-page__loader-container">
          <FontAwesomeIcon
            className="cart-page__loader-icon"
            icon={faCircleNotch}
            spin
          />
        </div>
      )
    } else {
      return (
        <section className="cart-page__products-list-section">
          {cartItems.map((cartItem, index) => (
            <>
              <ProductCard
                key={cartItem.id}
                product={cartItem.product}
                cartItemID={cartItem.id}
                isSmall={true}
                type={ProductCard.TYPE_CART}
              />
              {index < cartItems.length - 1 && (
                <div className="cart-page__item-divider-wrapper">
                  <div className="cart-page__item-divider" />
                </div>
              )}
            </>
          ))}
          {cartItems.length === 0 && (
            <p className="cart-page__no-results-text">
              <span className="cart-page__no-results-icon">😿</span>
              Oops, No products found. Please try adding some.
            </p>
          )}
        </section>
      )
    }
  }

  return (
    <div className="cart-page">
      <section className="cart-page__header-section">
        <div className="cart-page__header-section-container">
          <p className="cart-page__header-text">
            Your Cart ({cartItemsAmount} items)
          </p>
        </div>
      </section>
      <section className="cart-page__actions-section">
        <div className="cart-page__actions-section-container">
          <div className="cart-page__buttons-wrapper">
            <Button
              text={"Purchased Items"}
              icon={faMoneyBillWave}
              onClick={handlePurchasedItemsButton}
            />
          </div>
        </div>
      </section>
      {renderResults()}
      {cartItems.length > 0 && (
        <section className="cart-page__order-total-section">
          <div className="cart-page__order-total-content">
            <p className="cart-page__order-total-text">Order Total</p>
            <p className="cart-page__order-total-value">
              ${" "}
              {cartItems
                .reduce(
                  (previousValue, cartItem) =>
                    previousValue + cartItem.product.currentPrice,
                  0,
                )
                .toFixed(2)}
            </p>
            <Button
              text={"Proceed to Checkout"}
              icon={faMoneyBillWave}
              isLoading={isLoading}
              onClick={handleProceedToCheckoutButton}
            />
          </div>
        </section>
      )}
    </div>
  )
}

export default CartPage
