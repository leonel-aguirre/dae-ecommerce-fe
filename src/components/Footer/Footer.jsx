import AppLogo from "../AppLogo/AppLogo"
import "./Footer.scss"

import React from "react"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <AppLogo isLarge={false} isWhite={true} />
        <p className="footer__bottom-text">
          Built with 💙 by{" "}
          <a
            className="footer__anchor"
            href="https://github.com/leonel-aguirre"
          >
            @leonel-aguirre
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default Footer
