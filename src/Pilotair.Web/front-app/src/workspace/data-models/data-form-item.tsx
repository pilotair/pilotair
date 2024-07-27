import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import { Pilotair } from "@/schema";

interface Props {
  field: Pilotair.Application.DataModels.Field;
}

export default function DataFormItem({ field }: Props) {
  function getControl() {
    switch (field.component) {
      case "Switch":
        return <Switch />;
      case "Number":
        return <InputNumber />;
      case "TextArea":
        return <Input.TextArea />;
      case "Datetime":
        return <DatePicker />;
      case "Select":
        return (
          <Select
            mode="multiple"
            allowClear
            options={field.options?.map((m) => ({
              label: m.value,
              value: m.key,
            }))}
          />
        );
      case "Content":
        return <Select />;
      case "File":
        return <Button type="primary">Select file</Button>;
      case "TextBox":
      default:
        return <Input />;
    }
  }

  return (
    <Form.Item label={field.display || field.name} name={field.name}>
      {getControl()}
    </Form.Item>
  );
}
