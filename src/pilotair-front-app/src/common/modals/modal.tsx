import { Modal as AntdModal, ModalProps } from "antd";
import { useContext } from "react";
import { ModalContext } from "@/common/modals/context";

export default function Modal(props: ModalProps) {
  const { container } = useContext(ModalContext);

  return (
    <AntdModal
      wrapClassName="!absolute"
      styles={{
        mask: { position: "absolute" },
      }}
      getContainer={container ?? undefined}
      {...props}
    />
  );
}
