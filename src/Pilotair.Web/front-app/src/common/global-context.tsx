import { ReactNode, createContext, useMemo } from "react"
import { useModal } from "./use-modal"
import { Modal } from "antd"
import { useLoading } from "./use-loading"
import Loading from "@/common/basic/loading"

interface GlobalContextProps {
    modal: GlobalModal,
    loading: (action: Promise<unknown>) => Promise<unknown>;
    showLoading: (show: boolean) => void;
}

type GlobalModal = ReturnType<typeof Modal.useModal>[0] & { open: ReturnType<typeof useModal>["openModal"] }
export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps)

export default function GlobalModal({ children }: { children: ReactNode }) {
    const { modals, openModal } = useModal()
    const [modal, contextHolder] = Modal.useModal();
    const { showLoading, isLoading, loading } = useLoading()
    const globalModal = useMemo(() => ({ ...modal, open: openModal }), [modal, openModal])
    
    return <GlobalContext.Provider value={{
        modal: globalModal,
        showLoading,
        loading
    }}>
        {contextHolder}
        {children}
        {modals}
        <Loading show={isLoading} className="absolute inset-0" />
    </GlobalContext.Provider>

}