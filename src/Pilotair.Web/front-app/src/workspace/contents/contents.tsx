import { EditOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Divider, Empty, GetProp, Input, Table } from "antd"
import { useEffect, useState } from "react";
import { Pilotair } from "@/schema";
import { httpClient } from "@/utils/request";
import { useTabs } from "@/workspace/tabs";
import AsyncComponent from "@/common/async-component";

type Columns = GetProp<typeof Table, "columns">
interface Props {
    name: string,
    display?: string,
}

const { Search } = Input;

export default function Contents({ name, display }: Props) {
    const [collection, setCollection] = useState<Pilotair.Web.Contents.ContentCollection>();
    const [data, setData] = useState<Pilotair.Web.Contents.ContentPagingResult>()
    const { openTab } = useTabs()

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollection>("content-collection", { name }).then(rsp => setCollection(rsp!))
        httpClient.get<Pilotair.Web.Contents.ContentPagingResult>("content", {
            collection: name,
        }).then(rsp => setData(rsp!))
    }, [])

    function addContent() {
        openTab(
            `new-content/${name}`,
            `New ${display || name}`,
            <AsyncComponent component={() => import("./new-content")} props={{
                collection: name
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


    return (
        <div className="p-4 h-full flex flex-col space-y-3">
            <div className="flex flex-shrink-0">
                <div className="flex-1"></div>
                <Search className="w-64" placeholder="input search text" />
            </div>
            <Divider className="flex-shrink-0" />
            <div className="flex-1">
                <Table rowSelection={{

                }} className="h-full" size="small" dataSource={data?.list?.map(m => m.data)} columns={columns}></Table>
            </div>
        </div>

    )
}