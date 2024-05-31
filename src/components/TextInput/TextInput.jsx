import "./TextInput.scss"

import React, { forwardRef } from "react"
import PropTypes from "prop-types"

const TextInput = forwardRef(({ type = "text", label, ...rest }, ref) => {
  if (label) {
    return (
      <div className="text-input has-label">
        <input
          className="text-input__field"
          type={type}
          ref={ref}
          id={label}
          min={1}
          step={0.01}
          {...rest}
        />
        <label className="text-input__label" htmlFor={label}>
          {label}
        </label>
      </div>
    )
  }

  return <input className="text-input" type={type} ref={ref} {...rest} />
})

TextInput.displayName = "TextInput"

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
}

export default TextInput
