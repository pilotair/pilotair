import { ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input } from "antd"
import { httpClient } from "../utils/request";
import { useTabs } from "../workspace/tabs";
import { useMenu } from "../workspace/menu";
import { useState } from "react";
import { Pilotair } from "../schema";
import Fields from "./fields";

interface Props {
    name: string
}

export default function NewCollection({ name }: Props) {
    const [form] = Form.useForm<{ name: string }>();
    const { closeTab } = useTabs();
    const { loadMenus } = useMenu();

    const [fields, setFields] = useState<Pilotair.Web.DataModels.Field[]>([])

    async function onSave() {
        await form.validateFields();
        const model = form.getFieldsValue();
        await httpClient.post("content-collection", model)
        await loadMenus()
        closeTab(name);
    }

    return (
        <div className="p-4 h-full flex flex-col space-y-4">
            <div className="flex items-center gap-2 flex-shrink-0">
                <Button icon={<ReloadOutlined />}>Reset</Button>
                <div className="flex-1"></div>
                <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>
            </div>
            <Divider className="flex-shrink-0" />
            <Form
                className="flex-1"
                form={form}
                labelCol={{ span: 2 }}
            >
                <Form.Item label='Name' name="name" rules={[{ required: true }]} wrapperCol={{ span: 8 }}>
                    <Input />
                </Form.Item>
                <Form.Item label='Display' name="display" wrapperCol={{ span: 8 }}>
                    <Input />
                </Form.Item>
                <Form.Item label="Fields" rules={[{ required: true }]} wrapperCol={{ span: 18 }}>
                    <Fields list={fields} setList={setFields} />
                </Form.Item>
            </Form>
        </div>
    )
}