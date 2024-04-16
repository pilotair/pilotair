import { createBrowserRouter } from "react-router-dom";

import Login from './account/login.tsx'
import MainLayout from "./common/layout/main.tsx"
import SiderLayout from './common/layout/sider-layout.tsx'
import Project from "./project/page.tsx"

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
        element: <SiderLayout />,
        path: "/",
        loader: async () => {
            return await fetch("__api__/menu", {
                method: "GET",
                headers: {
                    contentType: "application/json"
                }
            })
        },
        children: [
            {
                path: "",
                element: <Project />
            }
        ]
    }
], { basename: "/__admin__" });