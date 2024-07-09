import { Modal, ModalFuncProps, ModalProps } from "antd";
import { createContext, ReactNode, useRef } from "react";
import { useModal } from "../use-modal";
import { useLoading } from "../use-loading";
import Loading from "../loading";

interface Tab {
    modalContainer: HTMLDivElement | null
    openModal: (props: ModalProps) => () => void;
    openConfirm: (props: ModalFuncProps) => Promise<void>;
    loading: (action: Promise<unknown>) => Promise<unknown>;
    showLoading: (show: boolean) => void;
    name: string
}

export const TabContext = createContext<Tab>({} as Tab);

interface Props {
    children: ReactNode,
    name: string
}

export function TabContextProvider({ children, name }: Props) {
    const modalContainer = useRef<HTMLDivElement>(null)

    const { modals, openModal } = useModal({
        wrapClassName: "!absolute",
        styles: {
            mask: { position: "absolute" }
        },
        getContainer: modalContainer.current!
    });

    const { isLoading, loading, showLoading } = useLoading()

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

    return <TabContext.Provider value={{
        modalContainer: modalContainer.current,
        openModal,
        openConfirm,
        loading,
        showLoading,
        name
    }}>
        <div className="relative h-full">
            {children}
            <div ref={modalContainer}>{modals}</div>
            <Loading show={isLoading} className="absolute inset-0" />
        </div>
    </TabContext.Provider>
}