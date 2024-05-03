import { combineReducers } from "@reduxjs/toolkit"

import { actions as authActions } from "./actions/authActions"

import authReducer from "./reducers/authReducer"

export { authActions }

export default combineReducers({
  authReducer,
})
