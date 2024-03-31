import { createBrowserRouter } from "react-router-dom";

import LeftMenuLayout from '@/common/layout/left-menu.tsx'
import App from "@/home/page.tsx"

export const router = createBrowserRouter([
    {
        element: <LeftMenuLayout />,
        path: "/",
        children: [
            {
                path:"",
                element: <App />
            }
        ]
    }
], { basename: "/__admin__" });