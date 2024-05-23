import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";

export function Field({ name, remove }: { name: number, remove: (index: number | number[]) => void }) {
    return (
        <div className="grid grid-cols-4 gap-2">
            <Form.Item
                name={[name, 'name']}
                rules={[{ required: true, message: 'Missing field name' }]}
            >
                <Input className="w-full" placeholder="Name" />
            </Form.Item>
            <Form.Item
                name={[name, 'display']}
                rules={[{ required: true, message: 'Missing field display' }]}
            >
                <Input placeholder="Display" />
            </Form.Item>
            <Form.Item
                name={[name, 'controlType']}
                rules={[{ required: true, message: 'Missing control type name' }]}
            >
                <Select placeholder="Control type" options={[{
                    label: "TextBox",
                    value: "TextBox"
                }]} />
            </Form.Item>
            <Form.Item >
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Form.Item>
        </div>
    )
}
