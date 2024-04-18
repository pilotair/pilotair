import { ModalProps } from "antd"

export function commonProps(key: string) {
    return {
        getContainer: `.tab-panel-${key}`,
        styles: {
            mask: { position: "absolute" },
        },
        wrapClassName: "!absolute",
    } as ModalProps
}