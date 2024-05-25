import { Form, Input, GetProps, Tabs } from "antd";

type TabItems = NonNullable<GetProps<typeof Tabs>["items"]>
export default function NewFieldForm() {

    const items: TabItems = [{
        key: "basic",
        label: "Basic",
        children: (
            <Form>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Missing field name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Display" name="display">
                    <Input />
                </Form.Item>
            </Form>
        )
    },
    {
        key: "advanced",
        label: "Advanced"
    }]


    return <Tabs items={items} />
}