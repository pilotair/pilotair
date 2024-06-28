import { ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import { httpClient } from "@/utils/request";
import { useTabs } from "@/workspace/tabs";
import { useMenu } from "@/workspace/menu";
import { useEffect, useState } from "react";
import { Pilotair } from "@/schema";
import Fields from "./fields";
import Empty from "@/common/empty";
import ToolbarLayout from "@/common/layout/toolbar-layout";

interface Props {
    name: string,
    path: string
}

export default function EditCollection({ name, path }: Props) {
    const [collection, setCollection] = useState<Pilotair.Web.Contents.ContentCollection>()
    const [fields, setFields] = useState<Pilotair.Web.DataModels.Field[]>([])
    const [form] = Form.useForm<Pilotair.Web.Contents.ContentCollection>();
    const { closeTab } = useTabs();
    const { loadMenus } = useMenu();

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollection>(`/content-collection?name=${name}`).then(rsp => {
            setCollection(rsp!)
            setFields(rsp!.fields)
        })
    }, [])



    async function onSave() {
        await form.validateFields();
        const model = form.getFieldsValue();
        model.fields = fields
        await httpClient.put("content-collection", model)
        await loadMenus()
        closeTab(path);
    }

    if (!collection) return <Empty />

    const barLeft = <Button icon={<ReloadOutlined />}>Reset</Button>;
    const barRight = <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>

    return (
        <ToolbarLayout barLeft={barLeft} barRight={barRight}>
            <Form
                form={form}
                layout="vertical"
                initialValues={collection}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label='Name' name="name" rules={[{ required: true }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label='Display' name="display">
                        <Input />
                    </Form.Item>
                </div>
            </Form>
            <Fields list={fields} setList={setFields} />
        </ToolbarLayout>
    )
}