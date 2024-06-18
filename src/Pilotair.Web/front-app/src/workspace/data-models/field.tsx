import { Input, InputNumber, Switch } from "antd";
import { Pilotair } from "@/schema";

interface Props {
    type: Pilotair.Web.DataModels.ControlTypes,
    value: unknown
}

export function Filed({ type, value }: Props) {
    if (type == "TextBox") {
        return <Input value={value?.toString()} />
    }

    if (type == "TextArea") {
        return <Input.TextArea value={value?.toString()} />
    }

    if (type == "Number") {
        return <InputNumber value={Number(value)} />
    }

    if (type == "Switch") {
        return <Switch value={Boolean(value)} />
    }
}