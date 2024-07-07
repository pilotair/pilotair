import { ReactNode, createContext } from "react"
import { useModal } from "./use-modal"
import { Modal } from "antd"
import { useLoading } from "./use-loading"
import Loading from "./loading"

interface GlobalContextProps {
    openModal: ReturnType<typeof useModal>["openModal"],
    modal: ReturnType<typeof Modal.useModal>[0],
    loading: (action: Promise<unknown>) => Promise<unknown>;
    showLoading: (show: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps)

export default function GlobalModal({ children }: { children: ReactNode }) {
    const { modals, openModal } = useModal()
    const [modal, contextHolder] = Modal.useModal();
    const { showLoading, isLoading, loading } = useLoading()
    return <GlobalContext.Provider value={{ openModal, modal, showLoading, loading }}>
        {contextHolder}
        {children}
        {modals}
        <Loading show={isLoading} className="absolute inset-0" />
    </GlobalContext.Provider>

}