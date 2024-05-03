import { post } from "../../api"

const logIn = (email, password) => async () => {
  try {
    const { data } = await post("/accounts/sign_in", { email, password })

    if (data?.email) {
      return { success: true }
    }
  } catch (error) {
    console.error(error)

    return { success: false, message: error?.response?.data?.errors }
  }
}

const registerAccount = (fullName, email, password) => async () => {
  try {
    await post("/accounts/create", {
      account: {
        full_name: fullName,
        email,
        password,
      },
    })

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
  logIn,
  registerAccount,
}
