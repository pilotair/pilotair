import { ReactNode, createContext } from "react"
import { useModal } from "./use-modal"
import { Modal } from "antd"

interface GlobalModalValue {
    openModal: ReturnType<typeof useModal>["openModal"],
    modal: ReturnType<typeof Modal.useModal>[0]
}

export const GlobalModalContext = createContext<GlobalModalValue>({} as GlobalModalValue)

export default function GlobalModal({ children }: { children: ReactNode }) {
    const { modals, openModal } = useModal()
    const [modal, contextHolder] = Modal.useModal();
    return <GlobalModalContext.Provider value={{ openModal, modal }}>
        {contextHolder}
        {children}
        {modals}
    </GlobalModalContext.Provider>

}