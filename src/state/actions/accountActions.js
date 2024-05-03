import { get } from "../../api"
import { snakeToCamelCaseObjectKeys } from "../../utils"
import { SET_FULL_ACCOUNT_DATA } from "../reducers/accountReducer"

const fetchAccountData = () => async (dispatch) => {
  try {
    const { data } = await get("/accounts/current")

    console.log({ data: snakeToCamelCaseObjectKeys(data) })

    dispatch({
      type: SET_FULL_ACCOUNT_DATA,
      payload: {
        accountData: snakeToCamelCaseObjectKeys(data),
      },
    })

    return { success: true }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to retrieve account data.",
    }
  }
}

export const actions = {
  fetchAccountData,
}
