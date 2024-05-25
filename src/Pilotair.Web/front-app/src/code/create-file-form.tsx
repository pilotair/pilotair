import { Form, Input } from "antd"
import { httpClient } from "../utils/request";
import { useContext } from "react";
import { ModalContext } from "../common/modal-context";
import { useMenu } from "../workspace/menu";

interface Props {
    path: string
}

export default function CreateFileForm({ path }: Props) {
    const [form] = Form.useForm<{ name: string }>();
    const { setOk } = useContext(ModalContext)
    const { loadMenus } = useMenu()

    setOk(async () => {
        await form.validateFields();
        const value = form.getFieldsValue();
        await httpClient.post("code", {
            name: value.name
        }, {
            searchParams: { folder: path }
        });
        loadMenus();
    })

    return (
        <Form form={form} preserve={false} layout="vertical">
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input file name!' }]}>
                <Input placeholder="File name" />
            </Form.Item>
        </Form>
    )
}