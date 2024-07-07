import { Button, Form, Input } from "antd"
import { TabContext } from "@/common/tab/tab-panel";
import { useContext } from "react";
import { useHttpClient } from "@/utils/http/use-client";
import { combine } from "@/utils/path";
import { FolderAddOutlined } from "@ant-design/icons";
import { useEvent } from "@/common/events/event";
import { reloadFiles } from "@/common/events/sources";

interface Props {
    folder: string
}

export default function CreateFolderBtn({ folder }: Props) {
    const { openModal } = useContext(TabContext)
    const [form] = Form.useForm();
    const reloadFilesEvent = useEvent(reloadFiles)
    let closeModal: () => void
    const { httpClient } = useHttpClient()

    async function onFinish(value: { name: string }) {
        await httpClient.post("file", new FormData(), {
            searchParams: {
                folder: combine(folder, value.name)
            }
        });
        reloadFilesEvent('');
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