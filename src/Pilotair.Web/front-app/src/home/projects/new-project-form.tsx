import { ModalContext } from "@/common/modal-context";
import { httpClient } from "@/utils/request";
import { Form, Input, Select, Space, GetProp } from "antd";
import { useContext, useEffect, useMemo } from "react";
import { useDomain } from "../domains/use-domain";
import { useProject } from "./use-project";

export default function NewProjectForm() {
    const { setOk } = useContext(ModalContext);
    const { domains, loadDomains } = useDomain();
    const { loadProjects } = useProject();
    type SelectOptions = GetProp<typeof Select, "options">;

    useEffect(() => {
        loadDomains()
    }, [])

    const [form] = Form.useForm()

    setOk(async () => {
        await form.validateFields();
        const model = form.getFieldsValue()
        await httpClient.post("/project", model);
        loadProjects();
    })

    const options = useMemo(() => {
        const result: SelectOptions = [];

        for (const domain of domains) {
            result.push({
                label: '.' + domain.name,
                value: domain.name
            })
        }

        return result;
    }, [domains])


    return (
        <Form form={form} layout="vertical">
            <Form.Item label="Name" name='name' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Domain" required >
                <Space.Compact className="w-full">
                    <Form.Item name='subdomain' rules={[{ required: true }]} noStyle><Input /></Form.Item>
                    <Form.Item name='domain' rules={[{ required: true }]} noStyle>
                        <Select options={options} />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
        </Form>
    )
}