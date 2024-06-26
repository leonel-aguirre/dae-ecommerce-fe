import React from "react"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

import HomePage from "./pages/HomePage/HomePage"
import LogInPage from "./pages/LogInPage/LogInPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import reducer from "./state"
import {
  URL_ADD_PRODUCT_PAGE,
  URL_CART_PAGE,
  URL_EDIT_PRODUCT_PAGE,
  URL_HOME_PAGE,
  URL_LOG_IN_PAGE,
  URL_PURCHASED_ITEMS_PAGE,
  URL_REGISTER_PAGE,
  URL_SEARCH_PAGE,
  URL_USER_PRODUCTS_PAGE,
} from "./constants"
import NavBar from "./components/NavBar/NavBar"
import SearchPage from "./pages/SearchPage/SearchPage"
import AddProductPage from "./pages/AddProductPage/AddProductPage"
import EditProductPage from "./pages/EditProductPage/EditProductPage"
import UserProductsPage from "./pages/UserProductsPage/UserProductsPage"
import CartPage from "./pages/CartPage/CartPage"
import Footer from "./components/Footer/Footer"
import PurchasedItemsPage from "./pages/PurchasedItemsPage/PurchasedItemsPage"

const store = configureStore({
  reducer,
})

const persistor = persistStore(store)

const AppWrapper = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route element={<AppWrapper />}>
                <Route path={URL_HOME_PAGE} element={<HomePage />} />
                <Route path={URL_SEARCH_PAGE} element={<SearchPage />} />
                <Route
                  path={URL_ADD_PRODUCT_PAGE}
                  element={<AddProductPage />}
                />
                <Route
                  path={URL_EDIT_PRODUCT_PAGE}
                  element={<EditProductPage />}
                />
                <Route
                  path={URL_USER_PRODUCTS_PAGE}
                  element={<UserProductsPage />}
                />
                <Route path={URL_CART_PAGE} element={<CartPage />} />
                <Route
                  path={URL_PURCHASED_ITEMS_PAGE}
                  element={<PurchasedItemsPage />}
                />
              </Route>
              <Route path={URL_LOG_IN_PAGE} element={<LogInPage />} />
              <Route path={URL_REGISTER_PAGE} element={<RegisterPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
