import { Button, Input, Space } from "antd";
import { KeyValue } from "./types";
import { ReactNode, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
    value?: KeyValue[],
    onChange?: (value: KeyValue[]) => void,
}

export default function KeyValueList({ value, onChange }: Props) {
    const [list, setList] = useState<KeyValue[]>(value || [])
    const items: ReactNode[] = [];

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

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        items.push(
            <Space.Compact>
                <Input placeholder="key" value={item.key} />
                <Input placeholder="value" value={item.key} />
                <Button onClick={() => onRemove(i)} icon={<DeleteOutlined />}></Button>
            </Space.Compact>
        )
    }

    return (
        <div className="space-y-2">
            {items}
            <Button shape="circle" icon={<PlusOutlined />} onClick={onAdd}></Button>
        </div>
    )
}