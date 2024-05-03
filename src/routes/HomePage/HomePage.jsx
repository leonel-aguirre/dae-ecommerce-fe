import "./HomePage.scss"

import React from "react"

import NavBar from "../../components/NavBar/NavBar"

const HomePage = () => {
  return (
    <div className="home-page">
      {/* TODO: Decide if this should be kept. */}
      {/* <div className="home-page__background">
        <div className="home-page__background-shape"></div>
      </div> */}
      <div className="home-page__foreground">
        <NavBar />
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
