import "./Button.scss"

import React from "react"
import PropTypes from "prop-types"

const Button = ({ text, isDisabled = false, ...rest }) => {
  return (
    <button className="button" disabled={isDisabled} {...rest}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
}

export default Button
