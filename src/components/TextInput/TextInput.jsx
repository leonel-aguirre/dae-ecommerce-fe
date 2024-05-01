import "./TextInput.scss"

import React, { forwardRef } from "react"
import PropTypes from "prop-types"

const TextInput = forwardRef(({ isPasswordType = false, ...rest }, ref) => {
  return (
    <input
      className="text-input"
      type={isPasswordType ? "password" : "text"}
      ref={ref}
      {...rest}
    />
  )
})

TextInput.displayName = "TextInput"

TextInput.propTypes = {
  isPasswordType: PropTypes.bool,
}

export default TextInput
