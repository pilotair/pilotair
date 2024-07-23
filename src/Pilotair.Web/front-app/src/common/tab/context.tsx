import { Modal, ModalFuncProps, ModalProps } from "antd";
import { createContext, ReactNode, useMemo, useState } from "react";
import { useModal } from "../use-modal";

interface Tab {
    modalContainer: HTMLDivElement | null
    modal: TabModal,
    name: string
}

type TabModal = ReturnType<typeof Modal.useModal>[0] & { open: ReturnType<typeof useModal>["openModal"] }

export const TabContext = createContext<Tab>({} as Tab);

interface Props {
    children: ReactNode,
    name: string
}

export function TabContextProvider({ children, name }: Props) {
    const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(null);

    const modalProps = useMemo<ModalProps>(() => ({
        wrapClassName: "!absolute",
        styles: {
            mask: { position: "absolute" }
        },
        getContainer: modalContainer!
    }), [modalContainer])

    const { modals, openModal } = useModal(modalProps);

    const [modal, ModalContextHolder] = Modal.useModal();

    const tabModal = useMemo(() => {
        const result = {
            open: openModal
        } as TabModal;

        for (const key in modal) {
            result[key as keyof typeof modal] = (props: ModalFuncProps) => modal[key as keyof typeof modal]({
                getContainer: modalContainer!,
                wrapClassName: "!absolute",
                styles: {
                    mask: { position: "absolute" }
                },
                ...props
            })
        }

        return result;
    }, [modal, openModal, modalContainer])

    return <TabContext.Provider value={{
        modalContainer: modalContainer,
        modal: tabModal,
        name
    }}>
        <div className="relative h-full">
            {children}
            <div ref={el => setModalContainer(el)}>
                {modals}
                {ModalContextHolder}
            </div>
        </div>
    </TabContext.Provider>
}