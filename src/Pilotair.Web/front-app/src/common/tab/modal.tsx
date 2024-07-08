import { Modal, ModalProps } from "antd";
import { useContext } from "react";
import { TabContext } from "./context";

export default function TabModal(props: ModalProps) {
    const { modalContainer } = useContext(TabContext)
    return <Modal
        wrapClassName="!absolute"
        styles={{
            mask: { position: "absolute" }
        }}
        getContainer={modalContainer ?? undefined}
        {...props}
    />
}