import { Button, Form, Input } from "antd"
import { TabContext } from "@/common/tab/tab-panel";
import { useContext } from "react";
import { httpClient } from "@/utils/request";
import { useFile } from "./files-store";
import { combine } from "@/utils/path";
import { FolderAddOutlined } from "@ant-design/icons";

export default function CreateFolderBtn() {
    const { openModal, loading } = useContext(TabContext)
    const [form] = Form.useForm();
    const fileStore = useFile()
    let closeModal: () => void

    async function onFinish(value: { name: string }) {
        const path = combine(fileStore.folder, value.name);

        await loading(async () => {
            await httpClient.post(`file/${path}`, new FormData());
        })

        await fileStore.reload()
        closeModal?.()
    }

    function onCreateFolder() {
        closeModal = openModal({
            title: "New Folder",
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

    return <Button ghost icon={<FolderAddOutlined />} type="primary" onClick={onCreateFolder}>Create Folder</Button>
}