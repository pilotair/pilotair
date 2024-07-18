import { EditOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, GetProp, Input, Table } from "antd"
import { Key, useEffect, useState } from "react";
import { Pilotair } from "@/schema";
import { useHttpClient } from "@/utils/http/use-client";
import { useTab } from "@/workspace/use-tab";
import AsyncComponent from "@/common/basic/async-component";
import ToolbarLayout from "@/common/layout/toolbar-layout";
import { combine } from "@/utils/path";
import { useEvent } from "@/common/events/event";
import { reloadContents } from "@/common/events/sources";

type Columns = GetProp<typeof Table, "columns">
interface Props {
    name: string,
    display?: string,
    path: string
}

const { Search } = Input;

export default function Contents({ name, display, path }: Props) {
    const [collection, setCollection] = useState<Pilotair.Web.Contents.ContentCollectionModel>();
    const [data, setData] = useState<Pilotair.Web.Contents.ContentPagingResult>()
    const { openTab } = useTab()
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
    const { httpClient } = useHttpClient()

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollectionModel>("content-collection", { name }).then(rsp => setCollection(rsp!))
        loadContents()
    }, [])

    function loadContents() {
        httpClient.get<Pilotair.Web.Contents.ContentPagingResult>("content", {
            collection: name,
        }).then(rsp => setData(rsp!))
    }

    useEvent(reloadContents, (e) => {
        if (e != name) return;
        loadContents();
    })

    function handleNew() {
        const addPath = combine('new', path)
        openTab({
            name: addPath,
            label: `New ${display || name}`,
            panel: <AsyncComponent component={() => import("./new-content")} props={{
                collection: name,
                path: addPath
            }} />,
            icon: <FormOutlined />
        })
    }

    function handleEdit(id: string) {
        const editPath = combine('edit', path)
        openTab({
            name: editPath,
            label: `Edit ${display || name}`,
            panel: <AsyncComponent component={() => import("./edit-content")} props={{
                collection: name,
                path: editPath,
                id
            }
            } />,
            icon: <FormOutlined />
        })
    }

    if (!collection) return 
    if (!data) return 

    async function handleDelete() {
        await httpClient.delete("/content", {
            collection: name,
            ids: selectedRowKeys as string[]
        })
        setSelectedRowKeys([])
        loadContents()
    }

    const columns: Columns = [
        ...collection.fields.map(m => ({
            title: m.display || m.name,
            dataIndex: ["data", m.name]
        })),
        {
            title: <Button type="text" shape="circle" icon={<PlusOutlined />} onClick={handleNew} />,
            render(value) {
                return <div>
                    <Button type="text" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(value.id)} />
                </div>
            },
            fixed: "right",
            width: 100,
            align: "end"
        }
    ]

    const barRight = <>
        {!!selectedRowKeys.length && <Button danger onClick={handleDelete}>Delete</Button>}
        <div className="flex-1"></div>
        <Search className="w-64" placeholder="input search text" />
    </>

    return (
        <ToolbarLayout header={barRight}>
            {
                <Table rowSelection={{
                    fixed: "left",
                    selectedRowKeys,
                    onChange: setSelectedRowKeys
                }} className="h-full" size="small" rowKey='id' dataSource={data?.list} columns={columns}>
                </Table>
            }
        </ToolbarLayout>
    )
}