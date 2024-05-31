import "./LogInPage.scss"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import TextInput from "../../components/TextInput/TextInput"
import Button from "../../components/Button/Button"
import AppLogo from "../../components/AppLogo/AppLogo"

import { authActions } from "../../state"
import { URL_HOME_PAGE } from "../../constants"

const { logIn } = authActions

const LogInPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isValid },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    const { email, password } = data

    const { success, message } = await dispatch(logIn(email, password))

    if (success) {
      navigate(URL_HOME_PAGE)
    } else {
      alert(message)
      reset()
      setFocus("email")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="log-in-page">
      <header className="log-in-page__header">
        <AppLogo isLarge={true} />
      </header>
      <form
        className="log-in-page__form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="log-in-page__main-header">Welcome Back!</h3>
        <p className="log-in-page__log-in-text">Log in to your account</p>
        <div className="log-in-page__form-controls-wrapper">
          <TextInput
            placeholder={"Email"}
            {...register("email", { required: true })}
          />
          <TextInput
            placeholder={"Password"}
            type="password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            text={"Log In"}
            isDisabled={!isValid}
            isLoading={isSubmitting}
          />
        </div>
        <p className="log-in-page__forgot-password-text">
          Forgot password?{" "}
          <a className="log-in-page__create-account-anchor" href={"/register"}>
            Create an account
          </a>
          .
        </p>
      </form>
    </div>
  )
}

export default LogInPage
