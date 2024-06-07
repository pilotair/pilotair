import { createContext } from "react";

interface SiderLayoutValue {
    collapsed: boolean
}

export const SiderLayoutContext = createContext<SiderLayoutValue>({} as SiderLayoutValue)