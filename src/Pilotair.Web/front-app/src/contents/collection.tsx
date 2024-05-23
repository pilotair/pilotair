import { PlusOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Tooltip } from "antd"
import { Field } from "./field"
import { httpClient } from "../utils/request";

export default function NewCollection() {
    const [form] = Form.useForm<{ name: string }>();

    async function onSave() {
        await form.validateFields();
        const model = form.getFieldsValue();
        await httpClient.post("/__api__/content-collection", model)
    }

    return (
        <div className="p-4 pt-8 h-full flex flex-col">
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
                <Divider />
                <Form.Item label="Fields" rules={[{ required: true }]} wrapperCol={{ span: 18 }}>
                    <Form.List name="fields">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name }) => (
                                    <Field key={key} name={name} remove={remove} />
                                ))}
                                <Tooltip placement="left" title="Add field">
                                    <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => add()} />
                                </Tooltip>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            </Form>
            <div className="flex-shrink-0">
                <Divider />
                <div className="flex items-center gap-2">
                    <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>
                    <Button icon={<ReloadOutlined />}>Reset</Button>
                </div>
            </div>
        </div>
    )
}