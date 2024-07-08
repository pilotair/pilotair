import { Form, Input } from "antd"
import { useHttpClient } from "@/utils/http/use-client";
import { useContext } from "react";
import { ModalContext } from "@/common/modal-context";
import { combine, splitPath } from "@/utils/path";
import { useEvent } from "@/common/events/event";
import { reloadFiles } from "@/common/events/sources";

interface Props {
    path: string
}

export default function RenameForm({ path }: Props) {
    const [form] = Form.useForm<{ name: string }>();
    const { setOk } = useContext(ModalContext)
    const { httpClient } = useHttpClient()
    const { folder, entry } = splitPath(path)
    const emitReloadFiles = useEvent(reloadFiles)

    setOk(async () => {
        await form.validateFields();
        const value = form.getFieldsValue();
        await httpClient.put("file/move", undefined, {
            searchParams: {
                path: path,
                newPath: combine(folder, value.name)
            }
        });
        emitReloadFiles()
    })

    return (
        <Form form={form} preserve={false} initialValues={{ name: entry }}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input new name!' }]}>
                <Input placeholder="New name" />
            </Form.Item>
        </Form>
    )
}