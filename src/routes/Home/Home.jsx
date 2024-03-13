import "./Home.scss"

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBolt,
  faMagnifyingGlass,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons"

const Home = () => {
  return (
    <div className="home">
      <div className="home__background">
        <div className="home__background-shape"></div>
      </div>
      <div className="home__foreground">
        <section className="home__navbar">
          <FontAwesomeIcon icon={faBolt} size="2x" className="home__app-logo" />
          <div className="home__search-box-container">
            <input className="home__search-box" type="text" />
            <button className="home__search-box-button">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </div>
          <button className="home__log-in-button">
            <span className="home__log-in-button-text">
              Log In
              <FontAwesomeIcon
                className="home__log-in-button-icon"
                icon={faRightToBracket}
              />
            </span>
          </button>
        </section>
        <section className="home__content">
          <h1 className="home__heading">Lorem ipsum dolor sit amet.</h1>
          <p className="home__paragraph">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
            quasi sed, voluptatibus, nihil recusandae modi provident, rerum in
            labore aliquam animi impedit corrupti voluptatem.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Home
