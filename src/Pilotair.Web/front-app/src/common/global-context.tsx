import { ReactNode, createContext, useMemo } from "react"
import { useModal } from "./use-modal"
import { Modal } from "antd"

interface GlobalContextProps {
    modal: GlobalModal,
}

type GlobalModal = ReturnType<typeof Modal.useModal>[0] & { open: ReturnType<typeof useModal>["openModal"] }
export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps)

export default function GlobalModal({ children }: { children: ReactNode }) {
    const { modals, openModal } = useModal()
    const [modal, contextHolder] = Modal.useModal();
    const globalModal = useMemo(() => ({ ...modal, open: openModal }), [modal, openModal])

    return <GlobalContext.Provider value={{
        modal: globalModal,
    }}>
        {contextHolder}
        {children}
        {modals}
    </GlobalContext.Provider>

}