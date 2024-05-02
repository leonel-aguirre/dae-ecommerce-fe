import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import HomePage from "./routes/HomePage/HomePage"
import LogInPage from "./routes/LogIn/LogInPage"

import reducer from "./state"
import { URL_HOME_PAGE, URL_LOG_IN_PAGE } from "./constants"

export const store = configureStore({
  reducer,
})

const router = createBrowserRouter([
  {
    path: URL_HOME_PAGE,
    element: <HomePage />,
  },
  {
    path: URL_LOG_IN_PAGE,
    element: <LogInPage />,
  },
])

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </Provider>
  )
}

export default App
