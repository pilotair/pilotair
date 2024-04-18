import { Modal, ModalFuncProps } from "antd"
import {commonProps} from "./modal"

export function openTabModal(key: string, props: ModalFuncProps) {
    const result = Modal.confirm({
        ...commonProps(key),
        icon: <span></span>,
        ...props
    })

    return { ...result }
}