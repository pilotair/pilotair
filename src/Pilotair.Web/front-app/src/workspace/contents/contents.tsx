import { EditOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Empty, GetProp, Input, Table } from "antd"
import { useEffect, useState } from "react";
import { Pilotair } from "@/schema";
import { httpClient } from "@/utils/request";
import { useTabs } from "@/workspace/tabs";
import AsyncComponent from "@/common/async-component";
import ToolbarLayout from "@/common/layout/toolbar-layout";
import { combine } from "@/utils/path";

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
    const { openTab } = useTabs()

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollectionModel>("content-collection", { name }).then(rsp => setCollection(rsp!))
        httpClient.get<Pilotair.Web.Contents.ContentPagingResult>("content", {
            collection: name,
        }).then(rsp => setData(rsp!))
    }, [])

    function addContent() {
        const addPath = combine('new', path)
        openTab(
            addPath,
            `New ${display || name}`,
            <AsyncComponent component={() => import("./new-content")} props={{
                collection: name,
                path: addPath
            }} />,
            <FormOutlined />
        )
    }

    if (!collection) return <Empty />

    function remove(value: unknown) {

    }

    const columns: Columns = [
        ...collection.fields.map(m => ({
            title: m.display || m.name,
            dataIndex: m.name
        })),
        {
            title: <Button type="text" shape="circle" icon={<PlusOutlined />} onClick={addContent} />,
            render(value) {
                return <div>
                    <Button type="text" shape="circle" icon={<EditOutlined />} onClick={() => remove(value)} />
                </div>
            },
            fixed: "right",
            width: 100,
            align: "end"
        }]

    const barRight = <Search className="w-64" placeholder="input search text" />

    return (
        <ToolbarLayout barRight={barRight}>
            <Table rowSelection={{

            }} className="h-full" size="small" dataSource={data?.list?.map(m => m.data)} columns={columns}></Table>
        </ToolbarLayout>
    )
}