import { createBrowserRouter } from "react-router-dom";
import Login from './account/login.tsx'
import BlankLayout from "./common/layout/blank-layout.tsx"
import Workspace from "./workspace/page.tsx"

export const router = createBrowserRouter([
    {
        element: <Workspace />,
        path: "/",
    },
    {
        path: "/account",
        element: <BlankLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            }
        ]
    },
], { basename: "/__admin__" });