import { Form, Input, GetProps, Tabs } from "antd";
import { useContext } from "react";
import { ModalContext } from "../common/modal-context";
import { Pilotair } from "../schema";

type TabItems = NonNullable<GetProps<typeof Tabs>["items"]>

interface Props {
    addField(field: Pilotair.Web.DataModels.Field): void;
}

export default function NewFieldForm({ addField }: Props) {
    const { setOk } = useContext(ModalContext);
    const [form] = Form.useForm<Pilotair.Web.DataModels.Field>();

    setOk(async () => {
        await form.validateFields();
        const value = form.getFieldsValue();
        addField(value);
    })

    const items: TabItems = [{
        key: "basic",
        label: "Basic",
        children: (
            <Form form={form}>
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