import "./TextInput.scss"

import React from "react"
import PropTypes from "prop-types"

const TextInput = ({ isPasswordType = false, ...rest }) => {
  return (
    <input
      className="text-input"
      type={isPasswordType ? "password" : "text"}
      {...rest}
    />
  )
}

TextInput.propTypes = {
  isPasswordType: PropTypes.bool,
}

export default TextInput
