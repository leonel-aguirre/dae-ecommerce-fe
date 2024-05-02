import { post } from "../../api"

const logIn = (email, password) => async () => {
  try {
    const response = await post("/accounts/sign_in", { email, password })

    console.log({ response })
  } catch (error) {
    console.error(error)
  }
}

export const actions = {
  logIn,
}
