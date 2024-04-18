import { Button, Form, Input } from "antd"
import { showTabModal } from "../common/modal";
import { TabContext } from "../common/tabs";
import { useContext } from "react";
import { httpClient } from "../utils/request";
import { useFileStore } from "./files-store";


export default function CreateFolderBtn() {
    const { key } = useContext(TabContext)
    const [form] = Form.useForm();
    const fileStore = useFileStore()
    let modal: ReturnType<typeof showTabModal> | undefined = undefined;

    async function onFinish(value: { name: string }) {
        await httpClient.post(`/__api__/file?path=${value.name}`);
        await fileStore.loadFiles();
        modal?.destroy()
    }

    function onCreateFolder() {
        modal = showTabModal(key, {
            content: <>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="name"
                        name="name"
                        rules={[{ required: true, message: 'Please input folder name!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </>,
            onOk: () => form.submit()
        })
    }

    return <Button ghost type="primary" onClick={onCreateFolder}>Create Folder</Button>
}