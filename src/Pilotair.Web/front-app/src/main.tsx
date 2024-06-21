import './index.css'
// import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import GlobalModal from "./common/global-modal"
import { Redirect, Route, Router, Switch } from "wouter"
import Home from "./home/page.tsx"
import Account from './account/page.tsx'
import Workspace from "./workspace/page.tsx"
import { base } from "@/common/router.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(

  // <React.StrictMode>
  <ConfigProvider>
    <GlobalModal>
      <Router base={base}>
        <Switch>
          <Route path='/home' component={Home} nest />
          <Route path="/account" component={Account} nest />
          <Route path="/workspace" component={Workspace} />
          <Redirect to='/home' />
        </Switch>
      </Router>
    </GlobalModal>
  </ConfigProvider>
  //</React.StrictMode>,
)
