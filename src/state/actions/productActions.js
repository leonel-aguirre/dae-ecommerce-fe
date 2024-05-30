import axios from "axios"
import { get, post } from "../../api"
import {
  CLEAR_SEARCH_RESULTS,
  SET_FEATURED_PRODUCT,
  SET_PRODUCT_CATEGORIES,
  SET_SEARCH_RESULTS,
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

const fetchSearchResults = (searchTerm, tag) => async (dispatch) => {
  try {
    await dispatch(clearSearchResults())
    const { data } = await post("/search", { term: searchTerm, tag: tag })

    if (data?.data) {
      await dispatch(setSearchResults(data.data))
      return { success: true }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to perform a product search.",
    }
  }
}

const createProduct = (productData) => async () => {
  const {
    title,
    description,
    currentPrice: current_price,
    tags,
    imageFile,
  } = productData

  try {
    const { data } = await post("/products", {
      product: { title, description, current_price, tags },
    })

    if (data?.data) {
      if (imageFile) {
        const formData = new FormData()
        formData.append("data", imageFile)

        await post(`/products/upload_image/${data?.data?.id}`, formData, {
          "content-type": "multipart/form-data",
        })
      }

      return { success: true }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to create a product search.",
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

const setSearchResults = (searchResults) => async (dispatch) => {
  await dispatch({
    type: SET_SEARCH_RESULTS,
    payload: { searchResults },
  })
}

const clearSearchResults = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_SEARCH_RESULTS,
  })
}

export const actions = {
  fetchProductCategories,
  setProductCategories,
  fetchFeaturedProduct,
  setFeaturedProduct,
  fetchSearchResults,
  setSearchResults,
  clearSearchResults,
  createProduct,
}
