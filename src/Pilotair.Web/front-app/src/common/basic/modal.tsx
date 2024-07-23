import { Modal as AntdModal, ModalProps } from "antd";
import { useContext } from "react";
import { TabContext } from "@/common/tab/context";

export default function Modal(props: ModalProps) {
    const { modalContainer } = useContext(TabContext)
    
    return <AntdModal
        wrapClassName="!absolute"
        styles={{
            mask: { position: "absolute" }
        }}
        getContainer={modalContainer ?? undefined}
        {...props}
    />
}