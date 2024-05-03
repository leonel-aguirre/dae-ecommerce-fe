import { combineReducers } from "@reduxjs/toolkit"

import { actions as authActions } from "./actions/authActions"
import { actions as accountActions } from "./actions/accountActions"

import { selectors as authSelectors } from "./reducers/authReducer"
import { selectors as accountSelectors } from "./reducers/accountReducer"

import authReducer from "./reducers/authReducer"
import accountReducer from "./reducers/accountReducer"

export { authActions, accountActions, authSelectors, accountSelectors }

export default combineReducers({
  authReducer,
  accountReducer,
})
