import { Button, Form, Input, Space } from "antd";
import { KeyValue } from "@/common/types";
import { ReactNode, useEffect, useRef } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useImmer } from "use-immer";

interface Props {
  value?: KeyValue[];
  onChange?: (value: KeyValue[]) => void;
}

export default function KeyValueList({ value, onChange }: Props) {
  const [list, setList] = useImmer<KeyValue[]>(value || []);
  const items: ReactNode[] = [];
  const { status } = Form.Item.useStatus();
  const mounted = useRef(true);

  useEffect(() => {
    if (mounted.current) {
      mounted.current = false;
      return;
    }
    onChange?.(list);
  }, [list, onChange]);

  function handleRemove(index: number) {
    setList((value) => {
      value.splice(index, 1);
    });
  }

  function handleAdd() {
    setList((value) => {
      value.push({ key: "option" + (value.length + 1), value: "" });
    });
  }

  function handleInputChange(
    index: number,
    property: keyof KeyValue,
    target: HTMLInputElement,
  ) {
    setList((value) => {
      const item = value[index];
      item[property] = target.value;
    });
  }

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    items.push(
      <Space.Compact key={i}>
        <Input
          status={"disable" as unknown as ""}
          placeholder="key"
          value={item.key}
          onChange={(e) => handleInputChange(i, "key", e.target)}
        />
        <Input
          status={"disable" as unknown as ""}
          placeholder="value"
          value={item.value}
          onChange={(e) => handleInputChange(i, "value", e.target)}
        />
        <Button
          className="hover-danger-button"
          onClick={() => handleRemove(i)}
          icon={<DeleteOutlined />}
        />
      </Space.Compact>,
    );
  }

  return (
    <div
      className={"space-y-2 " + (status == "error" ? "field-valid-error" : "")}
    >
      {items}
      <Button
        shape="circle"
        icon={<PlusOutlined />}
        onClick={handleAdd}
      ></Button>
    </div>
  );
}
