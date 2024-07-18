import { ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import { useHttpClient } from "@/utils/http/use-client";
import { useEffect, useState } from "react";
import { Pilotair } from "@/schema";
import FieldsList from "@/workspace/data-models/fields/field-list";
import ToolbarLayout from "@/common/layout/toolbar-layout";
import { useEvent } from "@/common/events/event";
import { reloadMenus } from "@/common/events/sources";
import { useTabSave } from "@/common/tab/use-tab-save";

interface Props {
    name: string,
    path: string
}

export default function EditCollection({ name }: Props) {
    const [collection, setCollection] = useState<Pilotair.Web.Contents.ContentCollectionModel>()
    const [form] = Form.useForm<Pilotair.Web.Contents.ContentCollectionModel>();
    const { httpClient } = useHttpClient()
    const emitReloadMenus = useEvent(reloadMenus);
    useTabSave(handleSave)

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollectionModel>(`/content-collection?name=${name}`).then(setCollection)
    }, [httpClient, name])

    async function handleSave() {
        await form.validateFields();
        const model = form.getFieldsValue();
        await httpClient.put("content-collection", model)
        emitReloadMenus();
    }

    if (!collection) return

    const header = <>
        <Button icon={<ReloadOutlined />} onClick={() => form.resetFields()}>Reset</Button>
        <div className="flex-1"></div>
        <Button icon={<SaveOutlined />} type="primary" onClick={handleSave}>Save</Button>
    </>

    return (
        <ToolbarLayout header={header} >
            <Form
                form={form}
                layout="vertical"
                initialValues={collection}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label='Name' name="name">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label='Display' name="display">
                        <Input />
                    </Form.Item>
                </div>
                <Form.Item label="Fields" rules={[{ required: true, type: "array" }]} name="fields">
                    <FieldsList />
                </Form.Item>
            </Form>

        </ToolbarLayout>
    )
}