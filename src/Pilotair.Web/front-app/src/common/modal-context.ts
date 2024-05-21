import { createContext } from "react";

interface ModalContextValue {
    setOk: (e: () => Promise<void>) => void;
}


export const ModalContext = createContext<ModalContextValue>({} as ModalContextValue)
