import { Modal, ModalFuncProps, ModalProps } from "antd";
import { ReactNode, createContext, createRef, forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import Loading from "../loading";

interface TabContextValue {
    modalContainer: HTMLDivElement | null,
    openModal: (props: ModalProps) => () => void;
    openConfirm: (props: ModalFuncProps) => Promise<void>;
    loading: (action: () => Promise<void>) => Promise<void>;
    showLoading: (show: boolean) => void;
    name: string
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
    const loadingStack = useRef(0)
    const modalContainer = createRef<HTMLDivElement>()
    const isLoading = useMemo(() => loadingStack.current > 0, [loadingStack])

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

    async function loading(action: () => Promise<void>) {
        showLoading(true);
        try {
            await action()
        } finally {
            showLoading(false);
        }
    }

    function showLoading(show: boolean = true) {
        if (show) {
            loadingStack.current++;
        } else {
            loadingStack.current--;
            if (loadingStack.current < 0) loadingStack.current = 0;
        }
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