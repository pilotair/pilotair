import { EditOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, GetProp, Input, Table } from "antd";
import { Key, useContext, useEffect, useState } from "react";
import { Pilotair } from "@/schema";
import { useHttpClient } from "@/utils/http/use-client";
import AsyncComponent from "@/common/basic/async-component";
import ToolbarLayout from "@/common/layout/toolbar-layout";
import { useEvent } from "@/common/events/event";
import { reloadContents } from "@/common/events/sources";
import { tabKeyTypes } from "@/common/tab/utils";
import { TabContext } from "@/common/tab/context";
import { TabsContext } from "../main-tabs";

type Columns = GetProp<typeof Table, "columns">;
interface Props {
  name: string;
  display?: string;
}

const { Search } = Input;

export default function Contents({ name, display }: Props) {
  const [collection, setCollection] =
    useState<Pilotair.Application.Contents.ContentCollectionModel>();
  const [data, setData] =
    useState<Pilotair.Application.Contents.ContentPagingResult>();
  const { openTab } = useContext(TabsContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const { httpGet, httpDelete } = useHttpClient();
  const { tabKey } = useContext(TabContext);

  useEffect(() => {
    httpGet<Pilotair.Application.Contents.ContentCollectionModel>(
      "content-collection",
      { name },
    ).then((rsp) => setCollection(rsp!));
    loadContents();
  }, []);

  function loadContents() {
    httpGet<Pilotair.Application.Contents.ContentPagingResult>("content", {
      collection: name,
    }).then((rsp) => setData(rsp!));
  }

  useEvent(reloadContents, (e) => {
    if (e != name) return;
    loadContents();
  });

  function handleNew() {
    openTab({
      name: tabKey.name,
      type: tabKeyTypes.new,
      label: `New ${display || name}`,
      panel: (
        <AsyncComponent
          component={() => import("./new-content")}
          props={{
            collection: name,
          }}
        />
      ),
      icon: <FormOutlined />,
    });
  }

  function handleEdit(id: string) {
    openTab({
      name: tabKey.name,
      type: tabKeyTypes.edit,
      label: `Edit ${display || name}`,
      panel: (
        <AsyncComponent
          component={() => import("./edit-content")}
          props={{
            collection: name,
            id,
          }}
        />
      ),
      icon: <FormOutlined />,
    });
  }

  if (!collection) return;
  if (!data) return;

  async function handleDelete() {
    await httpDelete("/content", {
      collection: name,
      ids: selectedRowKeys as string[],
    });
    setSelectedRowKeys([]);
    loadContents();
  }

  const columns: Columns = [
    ...collection.fields.map((m) => ({
      title: m.display || m.name,
      dataIndex: ["data", m.name],
    })),
    {
      title: (
        <Button
          type="text"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={handleNew}
        />
      ),
      render(value) {
        return (
          <div>
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(value.id)}
            />
          </div>
        );
      },
      fixed: "right",
      width: 100,
      align: "end",
    },
  ];

  const barRight = (
    <>
      {!!selectedRowKeys.length && (
        <Button danger onClick={handleDelete}>
          Delete
        </Button>
      )}
      <div className="flex-1"></div>
      <Search className="w-64" placeholder="input search text" />
    </>
  );

  return (
    <ToolbarLayout header={barRight}>
      {
        <Table
          rowSelection={{
            fixed: "left",
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          className="h-full"
          size="small"
          rowKey="id"
          dataSource={data?.list}
          columns={columns}
        ></Table>
      }
    </ToolbarLayout>
  );
}
