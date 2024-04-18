import { Modal, ModalProps } from "antd";
import { commonProps } from "./modal"
import { useContext } from "react";
import { TabContext } from "./tabs";

export default function TabModal(props: ModalProps) {
    const { key } = useContext(TabContext)
    return <Modal {...commonProps(key)} {...props} />
}