import { del, get, post, put } from "../../api"
import { snakeToCamelCaseObjectKeys } from "../../utils"
import {
  CLEAR_SEARCH_RESULTS,
  DECREASE_CART_ITEMS_AMOUNT,
  INCREASE_CART_ITEMS_AMOUNT,
  SET_CART_ITEMS,
  SET_CART_ITEMS_AMOUNT,
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

const fetchFeaturedProduct = () => async () => {
  try {
    const { data } = await get("/featured/product")

    if (data) {
      return { success: true, data: snakeToCamelCaseObjectKeys(data) }
    } else {
      return { success: false, data: {} }
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

const fetchCartItemsAmount = () => async (dispatch) => {
  try {
    const { data } = await get(`/cart/items_amount`)

    if (data?.data !== undefined) {
      dispatch(setCartItemsAmount(data?.data))
      return { success: true }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to retrieve cart items amount.",
    }
  }
}

const addProductToCart = (productID) => async (dispatch) => {
  try {
    const { data } = await post(`/cart/add_item`, { product_id: productID })

    if (data?.data !== undefined) {
      dispatch(increaseCartItemsAmount())
      return { success: true }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to add product to cart.",
    }
  }
}

const fetchCartItems = () => async (dispatch) => {
  try {
    const { data } = await get("/cart/items")

    if (data?.data !== undefined) {
      await dispatch(setCartItems(data.data))
      return { success: true }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to fetch cart items.",
    }
  }
}

const deleteCartItem = (cartItemID) => async (dispatch) => {
  try {
    await del(`/cart/item/${cartItemID}`)
    await dispatch(decreaseCartItemsAmount())
    await dispatch(fetchCartItems())

    return { success: true }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Error while trying to delete cart item.",
    }
  }
}

const fetchPurchasedItems = () => async () => {
  try {
    const { data } = await get("/cart/purchased-items")

    if (data?.data !== undefined) {
      return {
        success: true,
        data: data?.data.map((purchasedItem) =>
          snakeToCamelCaseObjectKeys(purchasedItem),
        ),
      }
    } else {
      return { success: false, data: {} }
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      data: {},
      message: "Error while trying to retrieve purchased items.",
    }
  }
}

const setProductCategories = (productCategories) => async (dispatch) => {
  await dispatch({
    type: SET_PRODUCT_CATEGORIES,
    payload: { productCategories },
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

const setCartItemsAmount = (cartItemsAmount) => async (dispatch) => {
  await dispatch({
    type: SET_CART_ITEMS_AMOUNT,
    payload: { cartItemsAmount },
  })
}

const increaseCartItemsAmount = () => async (dispatch) => {
  await dispatch({
    type: INCREASE_CART_ITEMS_AMOUNT,
  })
}

const decreaseCartItemsAmount = () => async (dispatch) => {
  await dispatch({
    type: DECREASE_CART_ITEMS_AMOUNT,
  })
}

const setCartItems = (cartItems) => async (dispatch) => {
  await dispatch({
    type: SET_CART_ITEMS,
    payload: { cartItems },
  })
}

export const actions = {
  fetchProductCategories,
  fetchFeaturedProduct,
  fetchSearchResults,
  fetchUserProducts,
  fetchProductByID,
  fetchCartItemsAmount,
  fetchCartItems,
  fetchPurchasedItems,
  setProductCategories,
  setSearchResults,
  createProduct,
  clearSearchResults,
  updateProductByID,
  deleteUserProduct,
  deleteCartItem,
  addProductToCart,
}
