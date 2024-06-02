import "./NavBar.scss"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCartShopping,
  faMagnifyingGlass,
  faPlus,
  faRightToBracket,
  faTableList,
  faUserLargeSlash,
} from "@fortawesome/free-solid-svg-icons"

import AppLogo from "../AppLogo/AppLogo"
import {
  authSelectors,
  accountActions,
  accountSelectors,
  authActions,
  productSelectors,
  productActions,
} from "../../state"
import { URL_SEARCH_PAGE } from "../../constants"

const { logOut } = authActions
const { fetchAccountData } = accountActions
const { fetchCartItemsAmount } = productActions
const { selectIsUserAuthenticated } = authSelectors
const { selectUserFullName } = accountSelectors
const { selectCartItemsAmount } = productSelectors

const NavBar = () => {
  const dispatch = useDispatch()
  const cartItemsAmount = useSelector(selectCartItemsAmount)
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const userFullName = useSelector(selectUserFullName)
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(fetchAccountData())
      dispatch(fetchCartItemsAmount())
    }
  }, [isUserAuthenticated])

  const handleLogInButton = () => {
    navigate("/log-in")
  }

  const handleLogOutButton = () => {
    dispatch(logOut())
  }

  const handleAddProductButton = () => {
    navigate("/add-product")
  }

  const handleUserProductsButton = () => {
    navigate("/user-products")
  }

  const handleSearchButton = (e) => {
    e.preventDefault()

    if (searchTerm) {
      navigate(`/search?term=${searchTerm}`)
      setSearchTerm("")
    } else {
      navigate(URL_SEARCH_PAGE)
    }
  }

  const renderRightEndContent = () => {
    if (isUserAuthenticated) {
      const [userFirstName] = userFullName.split(" ")

      return (
        <div className="nav-bar__user-content">
          <p className="nav-bar__user-name-greeting">
            Hi <span className="nav-bar__user-first-name">{userFirstName}</span>
            !
          </p>
          <div className="nav-bar__action-buttons-wrapper">
            <button
              className="nav-bar__user-action-button"
              onClick={handleUserProductsButton}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className="nav-bar__user-action-button-icon"
              />
              {cartItemsAmount > 0 && (
                <p className="nav-bar__user-action-button-badge">
                  {cartItemsAmount}
                </p>
              )}
            </button>

            <button
              className="nav-bar__user-action-button"
              onClick={handleUserProductsButton}
            >
              <FontAwesomeIcon
                icon={faTableList}
                className="nav-bar__user-action-button-icon"
              />
            </button>

            <button
              className="nav-bar__user-action-button"
              onClick={handleAddProductButton}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="nav-bar__user-action-button-icon"
              />
            </button>

            <button
              className="nav-bar__user-action-button"
              onClick={handleLogOutButton}
            >
              <FontAwesomeIcon
                icon={faUserLargeSlash}
                className="nav-bar__user-action-button-icon"
              />
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <button className="nav-bar__log-in-button" onClick={handleLogInButton}>
          <span className="nav-bar__log-in-button-text">
            Log In
            <FontAwesomeIcon
              className="nav-bar__log-in-button-icon"
              icon={faRightToBracket}
            />
          </span>
        </button>
      )
    }
  }

  return (
    <nav className="nav-bar">
      <AppLogo />
      <form className="nav-bar__search-box-container">
        <input
          className="nav-bar__search-box"
          type="text"
          size={25}
          placeholder="Search for products ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="nav-bar__search-box-button"
          onClick={handleSearchButton}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
      </form>

      {renderRightEndContent()}
    </nav>
  )
}

export default NavBar
