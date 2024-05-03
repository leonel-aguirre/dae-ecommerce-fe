import "./Button.scss"

import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

const Button = ({ text, isDisabled = false, isLoading = false, ...rest }) => {
  return (
    <button className="button" disabled={isDisabled || isLoading} {...rest}>
      {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
}

export default Button
