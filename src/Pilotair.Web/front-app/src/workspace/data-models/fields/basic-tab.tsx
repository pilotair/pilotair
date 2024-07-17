import { Form, Input, Select, Switch } from "antd";
import { controls, useControls, multipleControls } from "../use-controls";
import KeyValueList from "@/common/basic/key-value-list";
import { KeyValue } from "@/common/types";
import { useEffect, useState } from "react";
import { useHttpClient } from "@/utils/http/use-client";

export default function BasicTab() {
    const { controls: controlList } = useControls();
    const controlType = Form.useWatch("controlType")
    const [collections, setCollections] = useState<KeyValue[]>([])
    const { httpClient } = useHttpClient();

    useEffect(() => {
        if (controlType != controls.Content) return
        httpClient.get<KeyValue[]>("data-model/content-collections").then(setCollections)
    }, [httpClient, controlType])

    return (<>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Missing field name' }]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Control"
            name="controlType"
            rules={[{ required: true, message: 'Missing control type name' }]}
        >
            <Select placeholder="Control type" options={controlList.map(m => ({
                label: m,
                value: m
            }))} />
        </Form.Item>

        {
            multipleControls.includes(controlType) && <Form.Item label="Multiple" name="multiple">
                <Switch />
            </Form.Item>
        }

        {
            controlType == controls.Select &&
            <Form.Item
                label="Options"
                name="options"
                rules={[
                    { required: true, type: "array", message: 'options can not be empty' },
                    {
                        async validator(_rule, value: KeyValue[]) {
                            const keys = value.map(m => m.key?.toLowerCase());
                            if (keys.length != new Set(keys).size) throw new Error()
                        }, message: "Key must be unique"
                    }
                ]}
            >
                <KeyValueList />
            </Form.Item>
        }

        {
            controlType == controls.Content &&
            <Form.Item
                label="Content"
                name="collection"
                rules={[
                    { required: true, message: 'collection can not be empty' }
                ]}
            >
                <Select options={collections.map(m => ({
                    label: m.value,
                    value: m.key
                }))} />
            </Form.Item>
        }
    </>)
}