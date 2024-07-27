import { Form, Input, Select, Switch } from "antd";
import { useComponents } from "../use-components";
import KeyValueList from "@/common/basic/key-value-list";
import { KeyValue } from "@/common/types";
import { useEffect, useMemo, useState } from "react";
import { useHttpClient } from "@/utils/http/use-client";

export default function BasicTab() {
  const { components } = useComponents();
  const component = Form.useWatch("component");
  const [collections, setCollections] = useState<KeyValue[]>([]);
  const { httpClient } = useHttpClient();

  const currentComponent = useMemo(() => {
    return components.find((f) => f.name == component);
  }, [component, components]);

  useEffect(() => {
    if (component != "content") return;
    httpClient
      .get<KeyValue[]>("data-model/content-collections")
      .then(setCollections);
  }, [httpClient, component]);

  return (
    <>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Missing field name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Missing field type" }]}
      >
        <Select
          options={components.map((m) => ({
            label: m.name,
            value: m.name,
          }))}
        />
      </Form.Item>

      {currentComponent?.multiple && (
        <Form.Item label="Multiple" name="multiple">
          <Switch />
        </Form.Item>
      )}

      {component == "select" && (
        <Form.Item
          label="Options"
          name="options"
          rules={[
            {
              required: true,
              type: "array",
              message: "Options can not be empty",
            },
            {
              async validator(_rule, value: KeyValue[]) {
                const keys = value.map((m) => m.key?.toLowerCase());
                if (keys.length != new Set(keys).size) throw new Error();
              },
              message: "Key must be unique",
            },
            {
              async validator(_rule, value: KeyValue[]) {
                if (value.some((s) => !s.key)) throw new Error();
              },
              message: "Key can not be empty",
            },
          ]}
        >
          <KeyValueList />
        </Form.Item>
      )}

      {component == "content" && (
        <Form.Item
          label="Content"
          name="collection"
          rules={[{ required: true, message: "collection can not be empty" }]}
        >
          <Select
            options={collections.map((m) => ({
              label: m.value,
              value: m.key,
            }))}
          />
        </Form.Item>
      )}
    </>
  );
}
