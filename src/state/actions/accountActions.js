import { get } from "../../api"
import { snakeToCamelCaseObjectKeys } from "../../utils"
import {
  RESET_FULL_ACCOUNT_DATA,
  SET_FULL_ACCOUNT_DATA,
} from "../reducers/accountReducer"

const fetchAccountData = () => async (dispatch) => {
  try {
    const { data } = await get("/accounts/current")

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

const resetFullAccountData = () => async (dispatch) => {
  try {
    dispatch({
      type: RESET_FULL_ACCOUNT_DATA,
    })

    return { success: true }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to reset full account data.",
    }
  }
}

export const actions = {
  fetchAccountData,
  resetFullAccountData,
}
