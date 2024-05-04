import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { actions as authActions } from "./actions/authActions"
import { actions as accountActions } from "./actions/accountActions"

import { selectors as authSelectors } from "./reducers/authReducer"
import { selectors as accountSelectors } from "./reducers/accountReducer"

import authReducer from "./reducers/authReducer"
import accountReducer from "./reducers/accountReducer"

const persistConfig = {
  key: "root",
  storage,
}

export { authActions, accountActions, authSelectors, accountSelectors }

export default persistReducer(
  persistConfig,
  combineReducers({
    authReducer,
    accountReducer,
  }),
)
