import { createContext } from "react";

export interface ModalContextProps {
    setOk: (e: () => (Promise<void> | void)) => void;
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)
