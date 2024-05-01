import "./Button.scss"

import React from "react"
import PropTypes from "prop-types"

const Button = ({ children, ...rest }) => {
  return (
    <button className="button" {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Button
