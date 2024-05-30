import { snakeToCamelCaseObjectKeys } from "../../utils"

export const SET_PRODUCT_CATEGORIES = "SET_PRODUCT_CATEGORIES"
export const SET_FEATURED_PRODUCT = "SET_FEATURED_PRODUCT"
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS"
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS"

export const defaultState = {
  productCategories: [],
  featuredProduct: {},
  searchResults: [],
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PRODUCT_CATEGORIES:
      return {
        ...state,
        productCategories: action.payload.productCategories,
      }
    case SET_FEATURED_PRODUCT:
      return {
        ...state,
        featuredProduct: snakeToCamelCaseObjectKeys(
          action.payload.featuredProduct,
        ),
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
    default:
      return state
  }
}

const selectProductCategories = (state) =>
  state.productReducer.productCategories
const selectFeaturedProduct = (state) => state.productReducer.featuredProduct
const selectSearchResults = (state) => state.productReducer.searchResults

export default reducer

export const selectors = {
  selectProductCategories,
  selectFeaturedProduct,
  selectSearchResults,
}
