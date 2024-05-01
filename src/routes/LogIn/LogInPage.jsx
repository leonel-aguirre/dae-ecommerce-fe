import "./LogInPage.scss"

import React from "react"

import TextInput from "../../components/TextInput/TextInput"
import Button from "../../components/Button/Button"
import AppLogo from "../../components/AppLogo/AppLogo"

const LogInPage = () => {
  return (
    <div className="log-in-page">
      <header className="log-in-page__header">
        <AppLogo isLarge={true} />
      </header>
      <div className="log-in-page__form-container">
        <h3 className="log-in-page__main-header">Welcome Back!</h3>
        <p className="log-in-page__log-in-text">Log in to your account</p>
        <div className="log-in-page__form-controls-wrapper">
          <TextInput placeholder={"Email"} />
          <TextInput placeholder={"Password"} isPasswordType={true} />
          <Button>Log In</Button>
        </div>
        <p className="log-in-page__forgot-password-text">
          Forgot password?{" "}
          <a className="log-in-page__create-account-anchor" href={"/"}>
            Create an account
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default LogInPage
