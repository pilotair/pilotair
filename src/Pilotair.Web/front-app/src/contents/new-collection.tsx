import { PlusOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input } from "antd"
import { httpClient } from "../utils/request";
import { useTabs } from "../workspace/tabs";
import { useMenu } from "../workspace/menu";
import { useContext } from "react";
import { TabContext } from "../common/tab/tab-panel";
import NewFieldForm from "./new-field-form";

interface Props {
    name: string
}

export default function NewCollection({ name }: Props) {
    const [form] = Form.useForm<{ name: string }>();
    const { closeTab } = useTabs();
    const { loadMenus } = useMenu();
    const { openModal } = useContext(TabContext)

    async function onSave() {
        await form.validateFields();
        const model = form.getFieldsValue();
        await httpClient.post("content-collection", model)
        await loadMenus()
        closeTab(name);
    }

    function addField() {
        openModal({
            title: "New field",
            children: <NewFieldForm />
        })
    }

    return (
        <div className="p-4 pt-8 h-full flex flex-col">
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
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addField} />
                </Form.Item>
            </Form>
        </div>
    )
}