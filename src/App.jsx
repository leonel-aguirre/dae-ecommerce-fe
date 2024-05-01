import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from "./routes/HomePage/HomePage"
import LogInPage from "./routes/LogIn/LogInPage"
import { URL_HOME_PAGE, URL_LOG_IN_PAGE } from "./constants"

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
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
