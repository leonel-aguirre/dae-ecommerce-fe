import "./HomePage.scss"

import React from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMagnifyingGlass,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons"

import AppLogo from "../../components/AppLogo/AppLogo"

const HomePage = () => {
  const navigate = useNavigate()

  const handleLogInButton = () => {
    navigate("/log-in")
  }

  return (
    <div className="home-page">
      {/* TODO: Decide if this should be kept. */}
      {/* <div className="home-page__background">
        <div className="home-page__background-shape"></div>
      </div> */}
      <div className="home-page__foreground">
        <section className="home-page__navbar">
          <AppLogo />
          <div className="home-page__search-box-container">
            <input
              className="home-page__search-box"
              type="text"
              size={25}
              placeholder="Search for products ..."
            />
            <button className="home-page__search-box-button">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </div>
          <button
            className="home-page__log-in-button"
            onClick={handleLogInButton}
          >
            <span className="home-page__log-in-button-text">
              Log In
              <FontAwesomeIcon
                className="home-page__log-in-button-icon"
                icon={faRightToBracket}
              />
            </span>
          </button>
        </section>
        <section className="home-page__content">
          <h1 className="home-page__heading">Lorem ipsum dolor sit amet.</h1>
          <p className="home-page__paragraph">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
            quasi sed, voluptatibus, nihil recusandae modi provident, rerum in
            labore aliquam animi impedit corrupti voluptatem.
          </p>
        </section>
      </div>
    </div>
  )
}

export default HomePage
