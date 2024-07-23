import { useContext } from "react";
import { ModalContext } from "@/common/modal-context";
import { Form, Input } from "antd";
import { useHttpClient } from "@/utils/http/use-client";
import { useMenu } from "@/workspace/use-menu";

export function useNewFolderModal() {
    const { open } = useContext(ModalContext)
    const { loadMenus } = useMenu()
    const [form] = Form.useForm();
    let closeModal: () => void
    const { httpClient } = useHttpClient()

    async function handleFinish(value: { name: string }) {

        await httpClient.post("code/folder", undefined, {
            searchParams: { path: value.name }
        });

        closeModal?.()
        loadMenus();
    }

    return function () {
        closeModal = open({
            title: "New code folder",
            children: <>
                <Form form={form} onFinish={handleFinish} preserve={false}>
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