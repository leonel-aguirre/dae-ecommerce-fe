export const SET_IS_USER_AUTHENTICATED = "SET_IS_USER_AUTHENTICATED"

export const defaultState = {
  isUserAuthenticated: false,
}

const reducer = (state = defaultState, action = "") => {
  switch (action.type) {
    case SET_IS_USER_AUTHENTICATED:
      return {
        ...defaultState,
        isUserAuthenticated: action.payload.value,
      }
    default:
      return state
  }
}

const selectIsUserAuthenticated = (state) =>
  state.authReducer.isUserAuthenticated

export default reducer

export const selectors = {
  selectIsUserAuthenticated,
}
