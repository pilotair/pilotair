import { ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import { httpClient } from "@/utils/request";
import { useTab } from "@/workspace/use-tab";
import { useMenu } from "@/workspace/use-menu";
import { useEffect, useState } from "react";
import { Pilotair } from "@/schema";
import FieldsEditor from "./fields-editor";
import Empty from "@/common/empty";
import ToolbarLayout from "@/common/layout/toolbar-layout";

interface Props {
    name: string,
    path: string
}

export default function EditCollection({ name, path }: Props) {
    const [collection, setCollection] = useState<Pilotair.Web.Contents.ContentCollectionModel>()
    const [fields, setFields] = useState<Pilotair.Web.DataModels.Field[]>([])
    const [form] = Form.useForm<Pilotair.Web.Contents.ContentCollectionModel>();
    const { closeTab } = useTab();
    const { loadMenus } = useMenu();

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollectionModel>(`/content-collection?name=${name}`).then(rsp => {
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

    const header = <>
        <Button icon={<ReloadOutlined />}>Reset</Button>
        <div className="flex-1"></div>
        <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>
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
            </Form>
            <FieldsEditor list={fields} setList={setFields} />
        </ToolbarLayout>
    )
}