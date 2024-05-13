import { useContext } from "react";
import { GlobalModalContext } from "../common/global-modal";
import { Form, Input } from "antd";
import { httpClient } from "../utils/request";
import { useWorkspace } from "../workspace/workspace-store";

export function useNewFolderModal() {
    const { openModal } = useContext(GlobalModalContext)
    const { loadMenus } = useWorkspace()
    const [form] = Form.useForm();
    let closeModal: () => void

    async function onFinish(value: { name: string }) {

        await httpClient.post("/__api__/code/folder", undefined, {
            searchParams: { path: value.name }
        });

        closeModal?.()
        loadMenus();
    }

    return function () {
        closeModal = openModal({
            title: "New code folder",
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
}