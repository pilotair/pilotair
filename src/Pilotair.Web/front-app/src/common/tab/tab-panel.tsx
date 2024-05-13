import { Modal, ModalFuncProps, ModalProps } from "antd";
import { ReactNode, createContext, createRef} from "react";
import Loading from "../loading";
import { useTabModal } from "./use-tab-modal";
import { useTabLoading } from "./use-tab-loading";

interface TabContextValue {
    modalContainer: HTMLDivElement | null,
    openModal: (props: ModalProps) => () => void;
    openConfirm: (props: ModalFuncProps) => Promise<void>;
    loading: (action: () => Promise<void>) => void;
    showLoading: (show: boolean) => void;
    name: string
}

export const TabContext = createContext<TabContextValue>({} as TabContextValue)

interface TabPanelProps {
    children: ReactNode,
    name: string,
    isActive: boolean
}

export default function TabPanel({ children, name, isActive }: TabPanelProps) {
    const modalContainer = createRef<HTMLDivElement>()
    const { modals, openModal } = useTabModal();
    const { isLoading, loading, showLoading } = useTabLoading()

    function openConfirm(props: ModalFuncProps) {
        return new Promise<void>((rs, rj) => {
            Modal.confirm({
                getContainer: modalContainer.current!,
                wrapClassName: "!absolute",
                styles: {
                    mask: { position: "absolute" }
                },
                ...props,
                onOk: () => {
                    rs();
                    props.onOk?.();
                },
                onCancel: () => {
                    rj();
                    props.onCancel?.()
                }
            })
        })
    }

    return (
        <TabContext.Provider value={{
            modalContainer: modalContainer.current,
            openModal,
            openConfirm,
            loading,
            showLoading,
            name
        }}>
            <div
                className={"bg-white rounded-md h-full overflow-auto relative" + ` tab-panel-${name}`}
                style={{ display: isActive ? 'block' : 'none' }}
            >
                <div className="h-full overflow-auto">
                    {children}
                </div>
                <div ref={modalContainer}>{modals}</div>
                {isLoading && <Loading className="absolute inset-0" />}
            </div>

        </TabContext.Provider >
    )
}