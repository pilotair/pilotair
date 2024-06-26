import { Pilotair } from "@/schema";
import { Form } from "antd";
import { ReactNode, forwardRef, useImperativeHandle } from "react";
import DataFormItem from "./data-form-item";

interface Props {
    fields: Pilotair.Web.DataModels.Field[]
}

export interface DataFormRef {
    getValue(): Promise<unknown>
}

const DataForm = forwardRef<DataFormRef | undefined, Props>(function DataForm({ fields }, ref) {
    const items: ReactNode[] = [];
    const [form] = Form.useForm()

    async function getValue() {
        await form.validateFields();
        const value = form.getFieldsValue()
        return value;
    }

    useImperativeHandle(ref, () => ({
        getValue
    }))

    for (const field of fields) {
        items.push(<DataFormItem field={field} key={field.name} />)
    }

    return (
        <Form form={form} labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
            {items}
        </Form>
    )
})

export default DataForm;