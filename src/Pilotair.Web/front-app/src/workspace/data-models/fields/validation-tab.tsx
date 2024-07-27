import { Pilotair } from "@/schema";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input } from "antd";
import { ReactNode, useMemo, useState } from "react";

export default function ValidationTab() {
  const [rules, setRules] = useState<
    Pilotair.Application.DataModels.ValidateRule[]
  >([]);

  function handleAdd() {
    //
  }

  const ruleItems = useMemo(() => {
    const result: ReactNode[] = [];
    for (const i of rules) {
      result.push(
        <Form.Item label="Required">
          <Input />
        </Form.Item>,
      );
    }
    return result;
  }, [rules]);

  return (
    <>
      {ruleItems}
      <Form.Item label="Add Rule">
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                label: "Required",
                key: "required",
              },
            ],
          }}
        >
          <Button
            icon={<PlusOutlined />}
            onClick={handleAdd}
            type="dashed"
            className="!w-full"
          ></Button>
        </Dropdown>
      </Form.Item>
    </>
  );
}
