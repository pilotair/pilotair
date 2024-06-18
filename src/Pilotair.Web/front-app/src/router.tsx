import { createBrowserRouter } from "react-router-dom";
import Login from './account/login.tsx'
import BlankLayout from "./common/layout/blank-layout.tsx"
import Home from "./home/page.tsx"
import Workspace from "./workspace/page.tsx"
import Projects from "./home/projects/page.tsx"
import Domains from "./home/domains/page.tsx"

export const router = createBrowserRouter([
    {
        element: <Home />,
        path: "/",
        children: [
            {
                path: "",
                id: "projects",
                element: <Projects />
            },
            {
                path: "domains",
                id: "domains",
                element: <Domains />
            }
        ]
    },
    {
        path: "/account",
        element: <BlankLayout />,
        children: [
            {
                id: "login",
                path: "login",
                element: <Login />
            }
        ]
    },
    {
        element: <Workspace />,
        path: "/workspace",
    },
], { basename: "/__admin__" });