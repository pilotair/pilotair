import { Modal, ModalFuncProps } from "antd";

export function showTabModal(key: string, props: ModalFuncProps) {
    const result = Modal.confirm({
        getContainer: `.tab-panel-${key}`,
        styles: {
            mask: { position: "absolute" },
        },
        wrapClassName: "!absolute",
        icon: <span></span>,
        ...props
    })

    return { ...result }
}