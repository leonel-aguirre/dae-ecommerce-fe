import "./RegisterPage.scss"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import TextInput from "../../components/TextInput/TextInput"
import Button from "../../components/Button/Button"
import AppLogo from "../../components/AppLogo/AppLogo"

import { authActions } from "../../state"
import { URL_HOME_PAGE } from "../../constants"

const { registerAccount } = authActions

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setFocus,
    formState: { isValid },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    const { fullName, email, password, confirmPassword } = data

    const passwordsMatch = password === confirmPassword

    if (passwordsMatch) {
      const { success, message } = await dispatch(
        registerAccount(fullName, email, password),
      )

      if (success) {
        navigate(URL_HOME_PAGE)
      } else {
        alert(message)
        reset()
      }
    } else {
      alert("Passwords do not match.")

      resetField("password")
      resetField("confirmPassword")
      setFocus("password")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="register-page">
      <header className="register-page__header">
        <AppLogo isLarge={true} />
      </header>
      <form
        className="register-page__form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="register-page__main-header">Create an Account</h3>
        <p className="register-page__sub-title-text">
          Fill out the form to get started
        </p>
        <div className="register-page__form-controls-wrapper">
          <TextInput
            placeholder={"Full Name"}
            {...register("fullName", { required: true })}
          />
          <TextInput
            placeholder={"Email"}
            {...register("email", { required: true })}
          />
          <TextInput
            placeholder={"Password"}
            type="password"
            {...register("password", { required: true })}
          />
          <TextInput
            placeholder={"Confirm password"}
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          <Button
            type="submit"
            text={"Create"}
            isDisabled={!isValid}
            isLoading={isSubmitting}
          />
        </div>
        <p className="register-page__already-have-an-account-text">
          Already have an account?{" "}
          <a className="register-page__log-in-anchor" href={"/log-in"}>
            Log in
          </a>
          .
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
