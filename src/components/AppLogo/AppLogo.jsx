import "./AppLogo.scss"

import React from "react"
import PropTypes from "prop-types"
import { faBolt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

import { URL_HOME_PAGE } from "../../constants"

const AppLogo = ({ isLarge = false, isWhite = false }) => {
  const navigate = useNavigate()

  return (
    <button className="app-logo" onClick={() => navigate(URL_HOME_PAGE)}>
      <p
        className={`app-logo__app-logo-text ${isLarge && "is-large"} ${isWhite && "is-white"}`}
      >
        Spark
        <FontAwesomeIcon
          icon={faBolt}
          size={isLarge ? "3x" : "2x"}
          className={`app-logo__app-logo-icon ${isWhite && "is-white"}`}
        />
        Market
      </p>
    </button>
  )
}

AppLogo.propTypes = {
  isLarge: PropTypes.bool,
  isWhite: PropTypes.bool,
}

export default AppLogo
