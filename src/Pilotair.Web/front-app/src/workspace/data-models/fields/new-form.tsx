import { Form, GetProps, Tabs } from "antd";
import { useContext } from "react";
import { ModalContext } from "@/common/modal-context";
import { Pilotair } from "@/schema";
import BasicTab from "./basic-tab";
import AdvancedTab from "./advanced-tab";
import ValidationTab from "./validation-tab";

type TabItems = NonNullable<GetProps<typeof Tabs>["items"]>

interface Props {
    onAddField(field: Pilotair.Web.DataModels.Field): void;
}

export default function NewFieldForm({ onAddField }: Props) {
    const { setOk } = useContext(ModalContext);
    const [form] = Form.useForm<Pilotair.Web.DataModels.Field>();

    setOk(async () => {
        await form.validateFields();
        const value = form.getFieldsValue();
        onAddField(value);
    })

    const items: TabItems = [{
        key: "basic",
        label: "Basic",
        children: <BasicTab />
    },
    {
        key: "advanced",
        label: "Advanced",
        children: <AdvancedTab />
    },
    {
        key: "validation",
        label: "Validation",
        children: <ValidationTab />
    },
    ]


    return <Form initialValues={{
        controlType: "TextBox"
    }} labelCol={{ span: 4 }} form={form}><Tabs items={items} /></Form>
}