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
  URL_HOME_PAGE,
  URL_LOG_IN_PAGE,
  URL_REGISTER_PAGE,
  URL_SEARCH_PAGE,
} from "./constants"
import NavBar from "./components/NavBar/NavBar"
import SearchPage from "./pages/SearchPage/SearchPage"
import AddProductPage from "./pages/AddProductPage/AddProductPage"

const store = configureStore({
  reducer,
})

const persistor = persistStore(store)

const NavBarOutlet = () => {
  return (
    <>
      <NavBar />
      <Outlet />
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
              <Route element={<NavBarOutlet />}>
                <Route path={URL_HOME_PAGE} element={<HomePage />} />
                <Route path={URL_SEARCH_PAGE} element={<SearchPage />} />
                <Route
                  path={URL_ADD_PRODUCT_PAGE}
                  element={<AddProductPage />}
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
