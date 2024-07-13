import { Button, DatePicker, Form, Input, InputNumber, Select, Switch } from "antd";
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
        case "Datetime":
            return <DatePicker />
        case "Select":
            return <Select />
        case "Collection":
            return <Select />
        case "File":
            return <Button type="primary">Select file</Button>
        case "TextBox":
        default:
            return <Input />
    }
}

export default function DataFormItem({ field }: Props) {
    return <Form.Item label={field.display || field.name} name={field.name}>
        {getControl(field.controlType)}
    </Form.Item>
}