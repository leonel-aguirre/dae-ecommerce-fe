import { get, post } from "../../api"
import { SET_IS_USER_AUTHENTICATED } from "../reducers/authReducer"
import { actions as accountActions } from "./accountActions"

const { resetFullAccountData } = accountActions

const setIsUserAuthenticated = (value) => async (dispatch) => {
  await dispatch({
    type: SET_IS_USER_AUTHENTICATED,
    payload: { value },
  })
}

const logIn = (email, password) => async (dispatch) => {
  try {
    const { data } = await post("/accounts/sign_in", { email, password })

    if (data?.email) {
      await dispatch(setIsUserAuthenticated(true))
      return { success: true }
    }
  } catch (error) {
    console.error(error)

    return { success: false, message: error?.response?.data?.errors }
  }
}

const logOut = () => async (dispatch) => {
  try {
    await get("/accounts/sign_out")

    await dispatch(setIsUserAuthenticated(false))
    await dispatch(resetFullAccountData())

    return { success: true }
  } catch (error) {
    console.error(error)

    return { success: false, message: "Error while trying to log out." }
  }
}

const registerAccount = (fullName, email, password) => async (dispatch) => {
  try {
    await post("/accounts/create", {
      account: {
        full_name: fullName,
        email,
        password,
      },
    })

    await dispatch(setIsUserAuthenticated(true))

    return { success: true }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: error?.response?.data?.errors?.email?.[0],
    }
  }
}

export const actions = {
  setIsUserAuthenticated,
  logIn,
  logOut,
  registerAccount,
}
