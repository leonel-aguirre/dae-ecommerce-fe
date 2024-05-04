import "./NavBar.scss"

import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCog,
  faMagnifyingGlass,
  faRightToBracket,
  faUserLargeSlash,
} from "@fortawesome/free-solid-svg-icons"

import AppLogo from "../AppLogo/AppLogo"
import {
  authSelectors,
  accountActions,
  accountSelectors,
  authActions,
} from "../../state"

const { logOut } = authActions
const { fetchAccountData } = accountActions
const { selectIsUserAuthenticated } = authSelectors
const { selectUserFullName } = accountSelectors

const NavBar = () => {
  const dispatch = useDispatch()
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const userFullName = useSelector(selectUserFullName)
  const navigate = useNavigate()

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(fetchAccountData())
    }
  }, [isUserAuthenticated])

  const handleLogInButton = () => {
    navigate("/log-in")
  }

  const handleLogOutButton = () => {
    dispatch(logOut())
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
            <button className="nav-bar__user-action-button">
              <FontAwesomeIcon
                icon={faCog}
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
      <div className="nav-bar__search-box-container">
        <input
          className="nav-bar__search-box"
          type="text"
          size={25}
          placeholder="Search for products ..."
        />
        <button className="nav-bar__search-box-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
      </div>

      {renderRightEndContent()}
    </nav>
  )
}

export default NavBar
