import { createContext } from "react";

export interface ModalContextValue {
    setOk: (e: () => (Promise<void> | void)) => void;
}

export const ModalContext = createContext<ModalContextValue>({} as ModalContextValue)
