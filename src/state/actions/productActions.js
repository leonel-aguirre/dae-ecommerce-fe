import { del, get, post, put } from "../../api"
import { snakeToCamelCaseObjectKeys } from "../../utils"
import {
  CLEAR_SEARCH_RESULTS,
  SET_FEATURED_PRODUCT,
  SET_PRODUCT_CATEGORIES,
  SET_SEARCH_RESULTS,
  SET_USER_PRODUCTS,
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

const fetchProductByID = (productID) => async () => {
  try {
    const { data } = await get(`/products/${productID}`)

    if (data) {
      return { success: true, data: snakeToCamelCaseObjectKeys(data) }
    } else {
      return { success: false, data: {} }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      data: {},
      message: "Error while trying to retrieve product.",
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

const fetchUserProducts = () => async (dispatch) => {
  try {
    const { data } = await get("/user/products")

    if (data?.data) {
      await dispatch(setUserProducts(data.data))
      return { success: true }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to fetch user products.",
    }
  }
}

const updateProductByID = (productID, updatedProduct) => async (dispatch) => {
  try {
    const { title, description, currentPrice, previousPrice, tags, imageFile } =
      updatedProduct

    const { data } = await put(`/products/${productID}`, {
      product: {
        title,
        description,
        current_price: currentPrice,
        previous_price: previousPrice,
        tags,
      },
    })

    console.log(data?.data)

    if (data?.data && imageFile) {
      const formData = new FormData()
      formData.append("data", imageFile)

      await post(`/products/upload_image/${productID}`, formData, {
        "content-type": "multipart/form-data",
      })

      return { success: true }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to update product.",
    }
  }
}

const deleteUserProduct = (productID) => async (dispatch) => {
  try {
    const { data } = await del(`/products/${productID}`)

    if (data) {
      console.log("fetchUserProducts")

      await dispatch(fetchUserProducts())
      return { success: true }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to delete user product.",
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

const setUserProducts = (userProducts) => async (dispatch) => {
  await dispatch({
    type: SET_USER_PRODUCTS,
    payload: { userProducts },
  })
}

export const actions = {
  fetchProductCategories,
  fetchFeaturedProduct,
  fetchSearchResults,
  fetchUserProducts,
  fetchProductByID,
  setProductCategories,
  setFeaturedProduct,
  setSearchResults,
  createProduct,
  clearSearchResults,
  updateProductByID,
  deleteUserProduct,
}
