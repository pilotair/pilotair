import { Form, Input } from "antd";
import { useHttpClient } from "@/utils/http/use-client";
import { useContext } from "react";
import { combine, splitFolderEntry } from "@/utils/path";
import { useEvent } from "@/common/events/event";
import { reloadFiles } from "@/common/events/sources";
import { UseModalContext } from "@/common/modals/use-modal";

interface Props {
  path: string;
}

export default function RenameForm({ path }: Props) {
  const [form] = Form.useForm<{ name: string }>();
  const { setOk } = useContext(UseModalContext);
  const { httpPut } = useHttpClient();
  const { folder, entry } = splitFolderEntry(path);
  const emitReloadFiles = useEvent(reloadFiles);

  setOk(async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    await httpPut("file/move", undefined, {
      path: path,
      newPath: combine(folder, value.name),
    });
    emitReloadFiles();
  });

  return (
    <Form form={form} preserve={false} initialValues={{ name: entry }}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input new name!" }]}
      >
        <Input placeholder="New name" />
      </Form.Item>
    </Form>
  );
}
