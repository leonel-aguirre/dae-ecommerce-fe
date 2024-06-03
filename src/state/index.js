import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { actions as authActions } from "./actions/authActions"
import { actions as accountActions } from "./actions/accountActions"
import { actions as productActions } from "./actions/productActions"

import { selectors as authSelectors } from "./reducers/authReducer"
import { selectors as accountSelectors } from "./reducers/accountReducer"
import { selectors as productSelectors } from "./reducers/productReducer"

import authReducer from "./reducers/authReducer"
import accountReducer from "./reducers/accountReducer"
import productReducer from "./reducers/productReducer"

const persistConfig = {
  key: "root",
  storage,
}

export {
  authActions,
  accountActions,
  productActions,
  authSelectors,
  accountSelectors,
  productSelectors,
}

export default persistReducer(
  persistConfig,
  combineReducers({
    authReducer,
    accountReducer,
    productReducer,
  }),
)
