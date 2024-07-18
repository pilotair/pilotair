import { useContext } from "react";
import { GlobalContext } from "@/common/global-context";
import { Form, Input } from "antd";
import { useHttpClient } from "@/utils/http/use-client";
import { useMenu } from "@/workspace/use-menu";

export function useNewFolderModal() {
    const { modal } = useContext(GlobalContext)
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
        closeModal = modal.open({
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