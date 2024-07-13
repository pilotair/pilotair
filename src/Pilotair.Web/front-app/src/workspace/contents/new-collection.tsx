import { ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import { useHttpClient } from "@/utils/http/use-client";
import { useTab } from "@/workspace/use-tab";
import { Pilotair } from "@/schema";
import FieldsEditor from "./fields-editor";
import ToolbarLayout from "@/common/layout/toolbar-layout";
import { useTabSave } from "@/common/tab/use-tab-save";
import { useEvent } from "@/common/events/event";
import { reloadMenus } from "@/common/events/sources";

interface Props {
    path: string
}

export default function NewCollection({ path }: Props) {
    const [form] = Form.useForm<Pilotair.Web.Contents.ContentCollectionModel>();
    const { closeTab } = useTab();
    const { httpClient } = useHttpClient()
    const emitReloadMenus = useEvent(reloadMenus)
    useTabSave(onSave)

    async function onSave() {
        await form.validateFields();
        const model = form.getFieldsValue();
        await httpClient.post("content-collection", model)
        emitReloadMenus()
        closeTab(path);
    }

    function onReset() {
        form.resetFields();
    }

    const header = <>
        <Button icon={<ReloadOutlined />} onClick={onReset}>Reset</Button>
        <div className="flex-1"></div>
        <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>
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
                    <FieldsEditor />
                </Form.Item>
            </Form>
        </ToolbarLayout>
    )
}