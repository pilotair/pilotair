import { Form, Input, Select } from "antd";
import { useControls } from "../use-controls";


export default function BasicTab() {
    const { controls } = useControls();

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
    </>)
}