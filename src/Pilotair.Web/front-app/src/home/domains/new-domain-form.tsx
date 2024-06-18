import { ModalContext } from "@/common/modal-context";
import { httpClient } from "@/utils/request";
import { Form, Input } from "antd";
import { useContext } from "react";
import { useDomain } from "./use-domain";

export default function NewDomainForm() {
    const { setOk } = useContext(ModalContext);
    const [form] = Form.useForm()
    const { loadDomains } = useDomain()

    setOk(async () => {
        await form.validateFields();
        const model = form.getFieldsValue()
        await httpClient.post("/domain", model);
        loadDomains();
    })


    return (
        <Form form={form}>
            <Form.Item name='name' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    )
}