import { FormOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Divider, Input, Table } from "antd"
import { useEffect, useState } from "react";
import { Pilotair } from "../schema";
import { httpClient } from "../utils/request";
import { useTabs } from "../workspace/tabs";
import AsyncComponent from "../common/async-component";

interface Props {
    name: string,
    display?: string,
}

const { Search } = Input;

export default function Contents({ name, display }: Props) {
    const [data, setData] = useState<Pilotair.Web.Contents.ContentPagingResult>()
    const { openTab } = useTabs()

    useEffect(() => {
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

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex flex-shrink-0">
                <Search className="w-64" placeholder="input search text" />
                <div className="flex-1"></div>
                <Button type="primary" icon={<PlusOutlined />} onClick={addContent}>Add {display || name}</Button>
            </div>
            <Divider className="flex-shrink-0" />
            <div className="flex-1">
                <Table className="h-full" dataSource={data?.list} columns={[{ title: "Name", dataIndex: "name" }]}></Table>
            </div>
        </div>

    )
}