import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMagnifyingGlass,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons"

import AppLogo from "../AppLogo/AppLogo"
import { authSelectors, accountActions, accountSelectors } from "../../state"

const { selectIsUserAuthenticated } = authSelectors
const { selectUserFullName } = accountSelectors
const { fetchAccountData } = accountActions

const NavBar = () => {
  const dispatch = useDispatch()
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const userFullName = useSelector(selectUserFullName)
  const navigate = useNavigate()

  console.log({ userFullName })

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(fetchAccountData())
    }
  }, [isUserAuthenticated])

  const handleLogInButton = () => {
    navigate("/log-in")
  }

  return (
    <nav className="home-page__navbar">
      <AppLogo />
      <div className="home-page__search-box-container">
        <input
          className="home-page__search-box"
          type="text"
          size={25}
          placeholder="Search for products ..."
        />
        <button className="home-page__search-box-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
      </div>
      <button className="home-page__log-in-button" onClick={handleLogInButton}>
        <span className="home-page__log-in-button-text">
          Log In
          <FontAwesomeIcon
            className="home-page__log-in-button-icon"
            icon={faRightToBracket}
          />
        </span>
      </button>
    </nav>
  )
}

export default NavBar
