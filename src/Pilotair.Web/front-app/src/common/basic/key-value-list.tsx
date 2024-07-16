import { Button, Form, Input, Space } from "antd";
import { KeyValue } from "@/common/types";
import { ReactNode, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
    value?: KeyValue[],
    onChange?: (value: KeyValue[]) => void,
}

export default function KeyValueList({ value, onChange }: Props) {
    const [list, setList] = useState<KeyValue[]>(value || [])
    const items: ReactNode[] = [];
    const { status } = Form.Item.useStatus();

    function onRemove(index: number) {
        list.splice(index, 1);
        const newValue = [...list];
        setList(newValue);
        onChange?.(newValue)
    }

    function onAdd() {
        const newValue = [...list, { key: "", value: "" }];
        setList(newValue);
        onChange?.(newValue)
    }

    function onInputChange(index: number, property: keyof KeyValue, target: HTMLInputElement) {
        const item = list[index];
        item[property] = target.value;
        setList(list);
        onChange?.(list)
    }

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        items.push(
            <Space.Compact key={i}>
                <Input status={"disable" as unknown as ""} placeholder="key" value={item.key} onChange={e => onInputChange(i, "key", e.target)} />
                <Input status={"disable" as unknown as ""} placeholder="value" value={item.value} onChange={e => onInputChange(i, "value", e.target)} />
                <Button className="hover-danger-button" onClick={() => onRemove(i)} icon={<DeleteOutlined />}></Button>
            </Space.Compact>
        )
    }

    return (
        <div className={"space-y-2 " + (status == "error" ? "field-valid-error" : "")}>
            {items}
            <Button shape="circle" icon={<PlusOutlined />} onClick={onAdd}></Button>
        </div>
    )
}