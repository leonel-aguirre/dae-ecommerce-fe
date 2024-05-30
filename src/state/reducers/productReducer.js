import { snakeToCamelCaseObjectKeys } from "../../utils"

export const SET_PRODUCT_CATEGORIES = "SET_PRODUCT_CATEGORIES"
export const SET_FEATURED_PRODUCT = "SET_FEATURED_PRODUCT"

export const defaultState = {
  productCategories: [],
  featuredProduct: {},
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
    default:
      return state
  }
}

const selectProductCategories = (state) =>
  state.productReducer.productCategories
const selectFeaturedProduct = (state) => state.productReducer.featuredProduct

export default reducer

export const selectors = {
  selectProductCategories,
  selectFeaturedProduct,
}
