import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useHttpClient } from "@/utils/http/use-client";
import { Pilotair } from "@/schema";
import FieldsList from "@/workspace/data-models/fields/field-list";
import ToolbarLayout from "@/common/layout/toolbar-layout";
import { useTabSave } from "@/workspace/use-tab-save";
import { useEvent } from "@/common/events/event";
import { reloadMenus } from "@/common/events/sources";
import { useContext } from "react";
import { TabsContext } from "../main-tabs";
import { TabContext } from "@/common/tab/context";

export default function NewCollection() {
  const [form] =
    Form.useForm<Pilotair.Application.Contents.ContentCollectionModel>();
  const { closeTab } = useContext(TabsContext);
  const { tabKey } = useContext(TabContext);
  const { httpPost } = useHttpClient();
  const emitReloadMenus = useEvent(reloadMenus);
  useTabSave(handleSave);

  async function handleSave() {
    await form.validateFields();
    const model = form.getFieldsValue();
    await httpPost("content-collection", model);
    emitReloadMenus();
    closeTab(tabKey);
  }

  function handleReset() {
    form.resetFields();
  }

  const header = (
    <>
      <Button icon={<ReloadOutlined />} onClick={handleReset}>
        Reset
      </Button>
      <div className="flex-1"></div>
      <Button icon={<SaveOutlined />} type="primary" onClick={handleSave}>
        Save
      </Button>
    </>
  );

  return (
    <ToolbarLayout header={header}>
      <Form form={form} layout="vertical">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Display" name="display">
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label="Fields"
          rules={[{ required: true, type: "array" }]}
          name="fields"
        >
          <FieldsList />
        </Form.Item>
      </Form>
    </ToolbarLayout>
  );
}
