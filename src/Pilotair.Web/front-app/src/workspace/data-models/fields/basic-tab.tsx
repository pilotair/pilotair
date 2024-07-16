import { Form, Input, Select } from "antd";
import { useControls } from "../use-controls";
import KeyValueList from "@/common/basic/key-value-list";

export default function BasicTab() {
    const { controls } = useControls();
    const controlType = Form.useWatch("controlType")

    return (<>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Missing field name' }]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Control"
            name="controlType"
            rules={[{ required: true, message: 'Missing control type name' }]}
        >
            <Select placeholder="Control type" options={controls.map(m => ({
                label: m,
                value: m
            }))} />
        </Form.Item>

        {controlType == "Select" &&
            <Form.Item
                label="Options"
                name="options"
                rules={[{ required: true, type: "array", message: 'options can not be empty' }]}
            >
                <KeyValueList />
            </Form.Item>}
    </>)
}