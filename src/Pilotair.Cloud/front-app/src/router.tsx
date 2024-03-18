import { createBrowserRouter } from "react-router-dom";

import Home from './home/page.tsx'
import Login from './account/login.tsx'
import MainLayout from "./common/layout/main.tsx"
import LeftMenuLayout from './common/layout/left-menu.tsx'
import App from "./app/page.tsx"

export const router = createBrowserRouter([
    {
        path: "/account",
        element: <MainLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            }
        ]
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        element: <LeftMenuLayout />,
        path: "/app",
        children: [
            {
                path:"",
                element: <App />
            }
        ]
    }
], { basename: "/__admin__" });