import { Form, Input, GetProps, Tabs, Select } from "antd";
import { useContext } from "react";
import { ModalContext } from "@/common/modal-context";
import { Pilotair } from "@/schema";
import { useControls } from "../data-models/use-controls";

type TabItems = NonNullable<GetProps<typeof Tabs>["items"]>

interface Props {
    field: Pilotair.Web.DataModels.Field,
    updateField(field: Pilotair.Web.DataModels.Field): void;
}

export default function EditFieldForm({ field, updateField }: Props) {
    const { setOk } = useContext(ModalContext);
    const [form] = Form.useForm<Pilotair.Web.DataModels.Field>();
    const { controls } = useControls();

    setOk(async () => {
        await form.validateFields();
        const value = form.getFieldsValue();
        updateField(value);
    })

    const items: TabItems = [{
        key: "basic",
        label: "Basic",
        children: <>
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
        </>
    },
    {
        key: "advanced",
        label: "Advanced",
        children: <>
            <Form.Item label="Display" name="display">
                <Input />
            </Form.Item>
        </>
    }]


    return <Form initialValues={field} labelCol={{ span: 4 }} form={form}><Tabs items={items} /></Form>
}