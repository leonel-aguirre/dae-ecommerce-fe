import { post } from "../../api"

const logIn = (email, password) => async () => {
  try {
    const response = await post("/accounts/sign_in", { email, password })

    // TODO: Store token.
  } catch (error) {
    console.error(error)
  }
}

const registerAccount = (fullName, email, password) => async () => {
  try {
    const response = await post("/accounts/create", {
      account: {
        full_name: fullName,
        email,
        password,
      },
    })

    // TODO: Store token.
  } catch (error) {
    console.error(error)

    alert(error?.response?.data?.errors?.email?.[0])
  }
}

export const actions = {
  logIn,
  registerAccount,
}
