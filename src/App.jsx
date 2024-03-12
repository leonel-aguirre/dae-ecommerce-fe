import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./routes/Home/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
