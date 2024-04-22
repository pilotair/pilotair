import './index.css'
// import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
  //</React.StrictMode>,
)
