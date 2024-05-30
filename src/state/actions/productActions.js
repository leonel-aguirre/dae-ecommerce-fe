import { get } from "../../api"
import {
  SET_FEATURED_PRODUCT,
  SET_PRODUCT_CATEGORIES,
} from "../reducers/productReducer"

const fetchProductCategories = () => async (dispatch) => {
  try {
    const { data } = await get("/product_categories")

    if (data?.data) {
      await dispatch(setProductCategories(data?.data))
      return { success: true }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to retrieve product categories.",
    }
  }
}

const fetchFeaturedProduct = () => async (dispatch) => {
  try {
    const { data } = await get("/featured/product")

    if (data) {
      await dispatch(setFeaturedProduct(data))
      return { success: true }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to retrieve product categories.",
    }
  }
}

const setProductCategories = (productCategories) => async (dispatch) => {
  await dispatch({
    type: SET_PRODUCT_CATEGORIES,
    payload: { productCategories },
  })
}

const setFeaturedProduct = (featuredProduct) => async (dispatch) => {
  await dispatch({
    type: SET_FEATURED_PRODUCT,
    payload: { featuredProduct },
  })
}

export const actions = {
  fetchProductCategories,
  setProductCategories,
  fetchFeaturedProduct,
  setFeaturedProduct,
}
