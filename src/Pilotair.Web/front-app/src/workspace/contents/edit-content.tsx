import { useEffect, useRef, useState } from "react"
import { Pilotair } from "@/schema"
import { httpClient } from "@/utils/request";
import Empty from "@/common/empty";
import { Button, Divider } from "antd";
import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import DataForm, { DataFormRef } from "@/workspace/data-models/data-form";
import { useTab } from "../use-tab";

interface Props {
    collection: string,
    path: string,
    id: string
}

export default function EditContent({ collection, path, id }: Props) {
    const [contentCollection, setContentCollection] = useState<Pilotair.Web.Contents.ContentCollectionModel>();
    const dataForm = useRef<DataFormRef>();
    const { closeTab } = useTab()
    const [content, SetContent] = useState<Pilotair.Core.Stores.NoSqlite.DocumentIDictionaryStringObject>()

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollectionModel>("content-collection", { name: collection }).then(rsp => setContentCollection(rsp!))
        httpClient.get<Pilotair.Core.Stores.NoSqlite.DocumentIDictionaryStringObject>(`content/${collection}/${id}`).then(rsp => SetContent(rsp!))
    }, [])

    if (!contentCollection) return <Empty />
    if (!content) return <Empty />

    async function onSave() {
        const value = await dataForm.current?.getValue();
        await httpClient.put(`/content/${collection}/${id}`, value)
        closeTab(path)
    }

    return (
        <div className="p-4 h-full flex flex-col space-y-4">
            <div className="flex items-center gap-2 flex-shrink-0">
                <Button icon={<ReloadOutlined />}>Reset</Button>
                <div className="flex-1"></div>
                <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>
            </div>
            <Divider className="flex-shrink-0" />
            <DataForm initValues={content.data} fields={contentCollection.fields} ref={dataForm} />
        </div>
    )
}