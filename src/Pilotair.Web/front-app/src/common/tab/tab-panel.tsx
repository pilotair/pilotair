import { Modal, ModalFuncProps, ModalProps } from "antd";
import { ReactNode, createContext, createRef, forwardRef, useImperativeHandle, useState } from "react";

interface TabContextValue {
    modalContainer: HTMLDivElement | null,
    openModal: (props: ModalProps) => () => void;
    openConfirm: (props: ModalFuncProps) => Promise<void>;
}

export const TabContext = createContext<TabContextValue>({} as TabContextValue)

interface TabPanelProps {
    children: ReactNode,
    name: string,
    isActive: boolean
}

interface ModalHandle {
    close: () => void
}

export default function TabPanel({ children, name, isActive }: TabPanelProps) {
    const [modals, setModals] = useState<ReactNode[]>([]);
    const modalContainer = createRef<HTMLDivElement>()

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
        const ref = createRef<ModalHandle>()
        const modal = <TabModal key={new Date().getTime()} ref={ref} />
        setModals([...modals, modal]);

        return () => ref.current?.close();
    }

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
        <TabContext.Provider value={{ modalContainer: modalContainer.current, openModal, openConfirm }}>
            <div
                className={"bg-white rounded-md h-full overflow-auto relative" + ` tab-panel-${name}`}
                style={{ display: isActive ? 'block' : 'none' }}
            >
                <div className="h-full overflow-auto">{children}</div>
                <div ref={modalContainer}>{modals}</div>
            </div>

        </TabContext.Provider>
    )
}