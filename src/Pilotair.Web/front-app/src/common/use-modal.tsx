import { Modal, ModalProps } from "antd";
import { ReactNode, forwardRef, useId, useImperativeHandle, useState } from "react";
import { ModalContext } from "./modal-context";

interface ModalHandle {
    close: () => void
}

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

export function useModal(props?: ModalProps) {
    const [modals, setModals] = useState<ReactNode[]>([]);
    const id = useId();
    const useModalProps = props;

    function openModal(props: ModalProps) {
        const WrappedModal = createModal();
        let wrappedModal: ModalHandle | null
        let onOk: () => Promise<void> | void

        const modal = <ModalContext.Provider value={{ setOk: (e) => onOk = e }} key={id}>
            <WrappedModal
                afterClose={() => {
                    setModals(modals.filter(f => f != modal))
                }}
                onOk={async () => {
                    await onOk?.();
                    wrappedModal?.close()
                }}
                {...useModalProps}
                {...props}

                ref={e => wrappedModal = e} />
        </ModalContext.Provider>

        setModals([...modals, modal]);
        return () => wrappedModal?.close();
    }

    return {
        modals,
        openModal
    }
}