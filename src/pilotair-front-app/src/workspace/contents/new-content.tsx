import { useContext, useEffect, useRef, useState } from "react";
import { Pilotair } from "@/schema";
import { useHttpClient } from "@/utils/http/use-client";
import { Button, Divider } from "antd";
import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import DataForm, { DataFormRef } from "@/workspace/data-models/data-form";
import { useEvent } from "@/common/events/event";
import { reloadContents } from "@/common/events/sources";
import { TabsContext } from "../main-tabs";
import { TabContext } from "@/common/tab/context";

interface Props {
  collection: string;
  path: string;
}

export default function NewContent({ collection }: Props) {
  const [contentCollection, setContentCollection] =
    useState<Pilotair.Application.Contents.ContentCollectionModel>();
  const dataForm = useRef<DataFormRef>();
  const { closeTab } = useContext(TabsContext);
  const { tabKey } = useContext(TabContext);
  const emitReloadContents = useEvent(reloadContents);
  const { httpGet, httpPost } = useHttpClient();

  useEffect(() => {
    httpGet<Pilotair.Application.Contents.ContentCollectionModel>(
      "content-collection",
      { name: collection },
    ).then((rsp) => setContentCollection(rsp!));
  }, []);

  if (!contentCollection) return;

  async function handleSave() {
    const value = await dataForm.current?.getValue();
    await httpPost(`/content/${collection}`, value);
    closeTab(tabKey);
    emitReloadContents(collection);
  }

  function handleReset() {
    dataForm.current?.reset();
  }

  return (
    <div className="p-4 h-full flex flex-col space-y-4">
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          Reset
        </Button>
        <div className="flex-1"></div>
        <Button icon={<SaveOutlined />} type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
      <Divider className="flex-shrink-0" />
      <DataForm fields={contentCollection.fields} ref={dataForm} />
    </div>
  );
}
