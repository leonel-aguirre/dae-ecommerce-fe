export const SET_PRODUCT_CATEGORIES = "SET_PRODUCT_CATEGORIES"

export const defaultState = {
  productCategories: [],
}

const reducer = (state = defaultState, action = "") => {
  switch (action.type) {
    case SET_PRODUCT_CATEGORIES:
      return {
        ...defaultState,
        productCategories: action.payload.productCategories,
      }
    default:
      return state
  }
}

const selectProductCategories = (state) =>
  state.productReducer.productCategories

export default reducer

export const selectors = {
  selectProductCategories,
}
