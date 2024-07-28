import { Form, GetProps, Tabs } from "antd";
import { useContext } from "react";
import { Pilotair } from "@/schema";
import BasicTab from "./basic-tab";
import AdvancedTab from "./advanced-tab";
import ValidationTab from "./validation-tab";
import { UseModalContext } from "@/common/modals/use-modal";

type TabItems = NonNullable<GetProps<typeof Tabs>["items"]>;

interface Props {
  onAddField(field: Pilotair.Application.DataModels.Field): void;
}

export default function NewFieldForm({ onAddField }: Props) {
  const { setOk } = useContext(UseModalContext);
  const [form] = Form.useForm<Pilotair.Application.DataModels.Field>();

  setOk(async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    onAddField(value);
  });

  const items: TabItems = [
    {
      key: "basic",
      label: "Basic",
      children: <BasicTab />,
    },
    {
      key: "advanced",
      label: "Advanced",
      children: <AdvancedTab />,
    },
    {
      key: "validation",
      label: "Validation",
      children: <ValidationTab />,
    },
  ];

  return (
    <Form
      initialValues={{
        type: "textBox",
      }}
      labelCol={{ span: 4 }}
      form={form}
    >
      <Tabs items={items} />
    </Form>
  );
}
