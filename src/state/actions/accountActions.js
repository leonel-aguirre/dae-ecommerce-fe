import { get } from "../../api"
import { snakeToCamelCaseObjectKeys } from "../../utils"
import {
  RESET_FULL_ACCOUNT_DATA,
  SET_FULL_ACCOUNT_DATA,
} from "../reducers/accountReducer"
import { SET_IS_USER_AUTHENTICATED } from "../reducers/authReducer"

const fetchAccountData = () => async (dispatch) => {
  try {
    const { data } = await get("/accounts/current")

    await dispatch({
      type: SET_FULL_ACCOUNT_DATA,
      payload: {
        accountData: snakeToCamelCaseObjectKeys(data),
      },
    })

    return { success: true }
  } catch (error) {
    console.error(error)

    await dispatch(resetFullAccountData())
    await dispatch({
      type: SET_IS_USER_AUTHENTICATED,
      payload: {
        value: false,
      },
    })

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
