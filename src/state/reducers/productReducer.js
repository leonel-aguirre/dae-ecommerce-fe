import { snakeToCamelCaseObjectKeys } from "../../utils"

export const SET_PRODUCT_CATEGORIES = "SET_PRODUCT_CATEGORIES"
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS"
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS"
export const SET_USER_PRODUCTS = "SET_USER_PRODUCTS"

export const defaultState = {
  productCategories: [],
  searchResults: [],
  userProducts: [],
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PRODUCT_CATEGORIES:
      return {
        ...state,
        productCategories: action.payload.productCategories,
      }
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload.searchResults?.map((result) =>
          snakeToCamelCaseObjectKeys(result),
        ),
      }
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      }
    case SET_USER_PRODUCTS:
      return {
        ...state,
        userProducts: action.payload.userProducts?.map((product) =>
          snakeToCamelCaseObjectKeys(product),
        ),
      }
    default:
      return state
  }
}

const selectProductCategories = (state) =>
  state.productReducer.productCategories
const selectSearchResults = (state) => state.productReducer.searchResults
const selectUserProducts = (state) => state.productReducer.userProducts

export default reducer

export const selectors = {
  selectProductCategories,
  selectSearchResults,
  selectUserProducts,
}
