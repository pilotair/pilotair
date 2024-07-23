import { Modal, ModalFuncProps } from "antd";
import { createContext, useMemo, useState } from "react";
import { ChildrenProps } from "./types";
import { useModal } from "./use-modal";

type ModalFunc = ReturnType<typeof Modal.useModal>[0];

export const ModalContext = createContext({} as ModalFunc & {
    // setOk: (e: () => (Promise<void> | void)) => void;
    open: ReturnType<typeof useModal>["openModal"],
    container: HTMLDivElement | null
})

export function ModalProvider({ children }: ChildrenProps) {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [modal, ModalContextHolder] = Modal.useModal();
    const { modals, openModal } = useModal({
        wrapClassName: "!absolute",
        styles: {
            mask: { position: "absolute" }
        },
        getContainer: container ?? undefined
    })

    const modalFunc = useMemo(() => {
        const result = {} as ModalFunc;

        for (const key in modal) {
            result[key as keyof typeof modal] = (props: ModalFuncProps) => modal[key as keyof typeof modal]({
                getContainer: container!,
                wrapClassName: "!absolute",
                styles: {
                    mask: { position: "absolute" }
                },
                ...props
            })
        }

        return result;
    }, [modal, container])

    return (
        <ModalContext.Provider value={{ ...modalFunc, open: openModal, container }}>
            {children}
            <div ref={el => setContainer(el)}>
                {modals}
                {ModalContextHolder}
            </div>
        </ModalContext.Provider>
    )
}
