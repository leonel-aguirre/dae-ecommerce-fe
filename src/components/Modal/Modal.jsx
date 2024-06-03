import "./Modal.scss"

import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const Modal = ({ isOpen = false, onClose = () => {}, children }) => {
  if (!isOpen) {
    return null
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("is-modal-open")
    }
  }, [isOpen])

  const handleModalClose = () => {
    document.body.classList.remove("is-modal-open")
    onClose()
  }

  return createPortal(
    <div className="modal" onClick={handleModalClose}>
      <div
        className="modal__container"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="modal__close-button-wrapper">
          <button className="modal__close-button" onClick={handleModalClose}>
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

Modal.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Modal
