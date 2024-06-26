import { Form, Input, InputNumber, Switch } from "antd";
import { Pilotair } from "@/schema";

interface Props {
    field: Pilotair.Web.DataModels.Field;
}

function getControl(type: Pilotair.Web.DataModels.ControlTypes) {
    switch (type) {
        case "Switch":
            return <Switch />
        case "Number":
            return <InputNumber />
        case "TextArea":
            return <Input.TextArea />
        default:
            return <Input />
    }
}

export default function DataFormItem({ field }: Props) {
    return <Form.Item label={field.display || field.name} name={field.name}>
        {getControl(field.controlType)}
    </Form.Item>
}