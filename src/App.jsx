import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

import HomePage from "./routes/HomePage/HomePage"
import LogInPage from "./routes/LogInPage/LogInPage"
import RegisterPage from "./routes/RegisterPage/RegisterPage"

import reducer from "./state"
import { URL_HOME_PAGE, URL_LOG_IN_PAGE, URL_REGISTER_PAGE } from "./constants"

const store = configureStore({
  reducer,
})

const persistor = persistStore(store)

const router = createBrowserRouter([
  {
    path: URL_HOME_PAGE,
    element: <HomePage />,
  },
  {
    path: URL_LOG_IN_PAGE,
    element: <LogInPage />,
  },
  {
    path: URL_REGISTER_PAGE,
    element: <RegisterPage />,
  },
])

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
