import "./Button.scss"

import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

const Button = ({
  text,
  isDisabled = false,
  isLoading = false,
  icon,
  ...rest
}) => {
  return (
    <button className="button" disabled={isDisabled || isLoading} {...rest}>
      {isLoading ? (
        <FontAwesomeIcon icon={faCircleNotch} spin />
      ) : icon ? (
        <>
          <FontAwesomeIcon icon={icon} className="button__icon" /> {text}
        </>
      ) : (
        text
      )}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  icon: PropTypes.any,
}

export default Button
