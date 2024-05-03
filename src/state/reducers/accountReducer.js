export const SET_FULL_ACCOUNT_DATA = "SET_FULL_ACCOUNT_DATA"

export const defaultState = {
  id: "",
  email: "",
  user: {
    id: "",
    fullName: "",
  },
}

const reducer = (state = defaultState, action = "") => {
  switch (action.type) {
    case SET_FULL_ACCOUNT_DATA:
      return action.payload.accountData
    default:
      return state
  }
}

const selectUserFullName = (state) => state.accountReducer.user.fullName

export default reducer

export const selectors = {
  selectUserFullName,
}
