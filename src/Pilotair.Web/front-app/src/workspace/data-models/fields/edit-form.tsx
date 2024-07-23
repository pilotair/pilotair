import { Form, GetProps, Tabs } from "antd";
import { useContext } from "react";
import { Pilotair } from "@/schema";
import BasicTab from "./basic-tab";
import AdvancedTab from "./advanced-tab";
import ValidationTab from "./validation-tab";
import { UseModalContext } from "@/common/use-modal";

type TabItems = NonNullable<GetProps<typeof Tabs>["items"]>

interface Props {
    field: Pilotair.Web.DataModels.Field,
    updateField(field: Pilotair.Web.DataModels.Field): void;
}

export default function EditFieldForm({ field, updateField }: Props) {
    const { setOk } = useContext(UseModalContext);
    const [form] = Form.useForm<Pilotair.Web.DataModels.Field>();

    setOk(async () => {
        await form.validateFields();
        const value = form.getFieldsValue();
        updateField(value);
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


    return <Form initialValues={field} labelCol={{ span: 4 }} form={form}><Tabs items={items} /></Form>
}