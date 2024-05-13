import './index.css'
// import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ConfigProvider } from 'antd'
import GlobalModal from "./common/global-modal"

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ConfigProvider>
    <GlobalModal>
      <RouterProvider router={router} />
    </GlobalModal>
  </ConfigProvider>
  //</React.StrictMode>,
)
