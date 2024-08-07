import { useEvent } from "@/common/events/event";
import { reloadFiles } from "@/common/events/sources";
import { UseModalContext } from "@/common/modals/use-modal";
import { useHttpClient } from "@/utils/http/use-client";
import { combine } from "@/utils/path";
import { Form, Input } from "antd";
import { useContext } from "react";

interface Props {
  folder: string;
}

export default function NewFolderModal({ folder }: Props) {
  const [form] = Form.useForm();
  const { setOk } = useContext(UseModalContext);
  const { httpPost } = useHttpClient();
  const emitReloadFiles = useEvent(reloadFiles);

  setOk(async () => {
    await form.validateFields();
    const model = form.getFieldsValue();
    await httpPost("file", new FormData(), {
      folder: combine(folder, model.name),
    });
    emitReloadFiles();
  });

  return (
    <Form form={form} preserve={false}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input folder name!" }]}
      >
        <Input placeholder="Folder name" />
      </Form.Item>
    </Form>
  );
}
