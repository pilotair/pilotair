import { Modal, ModalProps } from "antd";
import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";

interface ModalHandle {
    close: () => void
}

export function useTabModal() {
    const [modals, setModals] = useState<ReactNode[]>([]);
    function openModal(props: ModalProps) {
        const TabModal = forwardRef<ModalHandle>((_, ref) => {
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
                wrapClassName="!absolute"
                styles={{
                    mask: { position: "absolute" }
                }}
                getContainer={false}
                open={open}
                {...props}
                onCancel={onCancel}
                maskClosable={false}
                destroyOnClose={true}
                afterClose={() => {
                    setModals(modals.filter(f => f != modal))
                }} />
        })
        let tabModal: ModalHandle | null
        const modal = <TabModal key={new Date().getTime()} ref={e => tabModal = e} />
        setModals([...modals, modal]);

        return () => tabModal?.close();
    }

    return {
        modals,
        openModal
    }
}