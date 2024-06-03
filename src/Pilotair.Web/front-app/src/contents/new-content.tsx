import { useEffect, useState } from "react"
import { Pilotair } from "../schema"
import { httpClient } from "../utils/request";
import Empty from "../common/empty";
import { Table, GetProp } from "antd";

type Columns = GetProp<typeof Table, "columns">
interface Props {
    collection: string
}

export default function NewContent({ collection }: Props) {
    const [contentCollection, setContentCollection] = useState<Pilotair.Web.Contents.ContentCollection>();
    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollection>("content-collection", { name: collection }).then(rsp => setContentCollection(rsp!))
    }, [])

    if (!contentCollection) return <Empty />

    const columns: Columns = contentCollection.fields.map(m => ({
        title: m.name,
        dataIndex: m.name
    }))

    return <Table columns={columns} />
}