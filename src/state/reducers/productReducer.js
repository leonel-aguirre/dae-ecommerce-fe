import { snakeToCamelCaseObjectKeys } from "../../utils"

export const SET_PRODUCT_CATEGORIES = "SET_PRODUCT_CATEGORIES"
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS"
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS"
export const SET_USER_PRODUCTS = "SET_USER_PRODUCTS"
export const SET_CART_ITEMS = "SET_CART_ITEMS"
export const SET_CART_ITEMS_AMOUNT = "SET_CART_ITEMS_AMOUNT"
export const INCREASE_CART_ITEMS_AMOUNT = "INCREASE_CART_ITEMS_AMOUNT"
export const DECREASE_CART_ITEMS_AMOUNT = "DECREASE_CART_ITEMS_AMOUNT"

export const defaultState = {
  productCategories: [],
  searchResults: [],
  userProducts: [],
  cartItems: [],
  cartItemsAmount: 0,
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
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload.cartItems?.map((product) =>
          snakeToCamelCaseObjectKeys(product),
        ),
      }
    case SET_CART_ITEMS_AMOUNT:
      return {
        ...state,
        cartItemsAmount: action.payload.cartItemsAmount,
      }
    case INCREASE_CART_ITEMS_AMOUNT:
      return {
        ...state,
        cartItemsAmount: state.cartItemsAmount + 1,
      }
    case DECREASE_CART_ITEMS_AMOUNT:
      return {
        ...state,
        cartItemsAmount: state.cartItemsAmount - 1,
      }
    default:
      return state
  }
}

const selectProductCategories = (state) =>
  state.productReducer.productCategories
const selectSearchResults = (state) => state.productReducer.searchResults
const selectUserProducts = (state) => state.productReducer.userProducts
const selectCartItems = (state) => state.productReducer.cartItems
const selectCartItemsAmount = (state) => state.productReducer.cartItemsAmount

export default reducer

export const selectors = {
  selectProductCategories,
  selectSearchResults,
  selectUserProducts,
  selectCartItems,
  selectCartItemsAmount,
}
