import { ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input } from "antd"
import { httpClient } from "@/utils/request";
import { useTabs } from "@/workspace/tabs";
import { useMenu } from "@/workspace/menu";
import { useState } from "react";
import { Pilotair } from "@/schema";
import Fields from "./fields";

interface Props {
    path: string
}

export default function NewCollection({ path }: Props) {
    const [form] = Form.useForm<Pilotair.Web.Contents.ContentCollection>();
    const { closeTab } = useTabs();
    const { loadMenus } = useMenu();

    const [fields, setFields] = useState<Pilotair.Web.DataModels.Field[]>([])

    async function onSave() {
        await form.validateFields();
        const model = form.getFieldsValue();
        model.fields = fields
        await httpClient.post("content-collection", model)
        await loadMenus()
        closeTab(path);
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
                form={form}
                layout="vertical"
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label='Name' name="name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Display' name="display">
                        <Input />
                    </Form.Item>
                </div>
            </Form>
            <Fields list={fields} setList={setFields} />
        </div>
    )
}