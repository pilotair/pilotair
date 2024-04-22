import { createBrowserRouter } from "react-router-dom";
import Login from './account/login.tsx'
import MainLayout from "./common/layout/main.tsx"
import Workspace from "./workspace/page.tsx"

export const router = createBrowserRouter([
    {
        element: <Workspace />,
        path: "/",
    },
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
], { basename: "/__admin__"});