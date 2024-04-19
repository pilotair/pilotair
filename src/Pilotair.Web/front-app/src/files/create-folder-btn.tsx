import { Button, Form, Input } from "antd"
import { TabContext } from "../common/tab/tab-panel";
import { useContext } from "react";
import { httpClient } from "../utils/request";
import { useFileStore } from "./files-store";
import { combine } from "../utils/path";

export default function CreateFolderBtn() {
    const { openModal } = useContext(TabContext)
    const [form] = Form.useForm();
    const fileStore = useFileStore()
    let closeModal: () => void

    async function onFinish(value: { name: string }) {
        const path = combine(fileStore.path, value.name);
        await httpClient.post(`/__api__/file?path=${path}`);
        await fileStore.loadFiles();
        closeModal?.()
    }

    function onCreateFolder() {
        closeModal = openModal({
            title: "Create folder",
            children: <>
                <Form form={form} onFinish={onFinish} preserve={false}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input folder name!' }]}>
                        <Input placeholder="Folder name" />
                    </Form.Item>
                </Form>
            </>,
            onOk: () => form.submit(),
        })
    }

    return <Button ghost type="primary" onClick={onCreateFolder}>Create Folder</Button>
}