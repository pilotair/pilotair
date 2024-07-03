import { ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import { httpClient } from "@/utils/request";
import { useTab } from "@/workspace/use-tab";
import { useMenu } from "@/workspace/use-menu";
import { useState } from "react";
import { Pilotair } from "@/schema";
import FieldsEditor from "./fields-editor";
import ToolbarLayout from "@/common/layout/toolbar-layout";

interface Props {
    path: string
}

export default function NewCollection({ path }: Props) {
    const [form] = Form.useForm<Pilotair.Web.Contents.ContentCollectionModel>();
    const { closeTab } = useTab();
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

    const header = <>
        <Button icon={<ReloadOutlined />}>Reset</Button>
        <div className="flex-1"></div>
        <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>
    </>

    return (
        <ToolbarLayout header={header}>
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
            <FieldsEditor list={fields} setList={setFields} />
        </ToolbarLayout>
    )
}