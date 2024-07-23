import { Modal, ModalProps } from "antd";
import { ReactNode, createContext, forwardRef, useCallback, useId, useImperativeHandle, useRef, useState } from "react";

interface ModalHandle {
    close: () => void
}

export const UseModalContext = createContext({} as {
    setOk: (e: () => (Promise<void> | void)) => void;
})

function createModal() {
    return forwardRef<ModalHandle, ModalProps>((props, ref) => {
        const [open, setOpen] = useState(true);

        useImperativeHandle(ref, () => ({
            close() {
                setOpen(false);
            }
        }))

        function onCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            setOpen(false);
            props.onCancel?.(e)
        }

        return <Modal
            {...props}
            open={open}
            onCancel={onCancel}
            maskClosable={false}
            destroyOnClose={true} />
    })
}

export function useModal(modalProps?: ModalProps) {
    const [modals, setModals] = useState<ReactNode[]>([]);
    const id = useId();
    const index = useRef(0)

    const openModal = useCallback((props: ModalProps) => {
        index.current = index.current++;
        const WrappedModal = createModal();
        let wrappedModal: ModalHandle | null
        let onOk: () => Promise<void> | void

        const modal = <UseModalContext.Provider value={{ setOk: (e) => onOk = e }} key={id + index}>
            <WrappedModal
                afterClose={() => {
                    setModals(m => m.filter(f => f != modal))
                }}
                onOk={async () => {
                    await onOk?.();
                    wrappedModal?.close()
                }}
                {...modalProps}
                {...props}

                ref={e => wrappedModal = e} />
        </UseModalContext.Provider>

        setModals(m => [...m, modal]);
        return () => wrappedModal?.close();
    }, [id, modalProps])

    return {
        modals,
        openModal
    }
}