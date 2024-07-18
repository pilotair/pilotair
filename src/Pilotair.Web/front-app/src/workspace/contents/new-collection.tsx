import { FormOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import { useHttpClient } from "@/utils/http/use-client";
import { useTab } from "@/workspace/use-tab";
import { Pilotair } from "@/schema";
import FieldsList from "@/workspace/data-models/fields/field-list";
import ToolbarLayout from "@/common/layout/toolbar-layout";
import { useTabSave } from "@/common/tab/use-tab-save";
import { useEvent } from "@/common/events/event";
import { reloadMenus } from "@/common/events/sources";
import AsyncComponent from "@/common/basic/async-component";
import { combine, removeFragment } from "@/utils/path";

interface Props {
    path: string
}

export default function NewCollection({ path }: Props) {
    const [form] = Form.useForm<Pilotair.Web.Contents.ContentCollectionModel>();
    const { replaceTab } = useTab();
    const { httpClient } = useHttpClient()
    const emitReloadMenus = useEvent(reloadMenus)
    useTabSave(handleSave)

    async function handleSave() {
        await form.validateFields();
        const model = form.getFieldsValue();
        await httpClient.post("content-collection", model)
        emitReloadMenus()
        const editPath = combine("edit", removeFragment(path, 1))
        replaceTab(path, {
            name: editPath,
            label: `Edit ${model.name}`,
            panel: <AsyncComponent component={() => import("./edit-collection")} props={{ name: model.name, path: editPath }} />,
            icon: <FormOutlined />
        });
    }

    function handleReset() {
        form.resetFields();
    }

    const header = <>
        <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>
        <div className="flex-1"></div>
        <Button icon={<SaveOutlined />} type="primary" onClick={handleSave}>Save</Button>
    </>

    return (
        <ToolbarLayout header={header} >
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
                <Form.Item label="Fields" rules={[{ required: true, type: "array" }]} name="fields">
                    <FieldsList />
                </Form.Item>
            </Form>
        </ToolbarLayout>
    )
}