import { ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input } from "antd"
import { httpClient } from "@/utils/request";
import { useTabs } from "@/workspace/tabs";
import { useMenu } from "@/workspace/menu";
import { useEffect, useState } from "react";
import { Pilotair } from "@/schema";
import Fields from "./fields";
import Empty from "@/common/empty";

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
        </div>
    )
}