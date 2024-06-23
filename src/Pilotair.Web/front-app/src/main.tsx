import './index.css'
// import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import GlobalModal from "./common/global-modal"
import { Redirect, Route, Router, Switch } from "wouter"
import Account from './account/page.tsx'
import Workspace from "./workspace/page.tsx"
import { base } from "@/common/router.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(

  // <React.StrictMode>
  <ConfigProvider>
    <GlobalModal>
      <Router base={base}>
        <Switch>
          <Route path="/" component={Workspace} />
          <Route path="/account" component={Account} nest />
          <Redirect to='/' />
        </Switch>
      </Router>
    </GlobalModal>
  </ConfigProvider>
  //</React.StrictMode>,
)
