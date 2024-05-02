import "./LogInPage.scss"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import TextInput from "../../components/TextInput/TextInput"
import Button from "../../components/Button/Button"
import AppLogo from "../../components/AppLogo/AppLogo"

import { authActions } from "../../state"

const { logIn } = authActions

const LogInPage = () => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    const { email, password } = data

    dispatch(logIn(email, password))

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
            isPasswordType={true}
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