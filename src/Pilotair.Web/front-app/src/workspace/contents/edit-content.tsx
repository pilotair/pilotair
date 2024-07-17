import { useEffect, useRef, useState } from "react"
import { Pilotair } from "@/schema"
import { useHttpClient } from "@/utils/http/use-client";
import { Button, Divider } from "antd";
import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import DataForm, { DataFormRef } from "@/workspace/data-models/data-form";

interface Props {
    collection: string,
    path: string,
    id: string
}

export default function EditContent({ collection, id }: Props) {
    const [contentCollection, setContentCollection] = useState<Pilotair.Web.Contents.ContentCollectionModel>();
    const dataForm = useRef<DataFormRef>();
    const [content, SetContent] = useState<Pilotair.Core.Stores.NoSqlite.DocumentIDictionaryStringObject>()
    const { httpClient } = useHttpClient()

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollectionModel>("content-collection", { name: collection }).then(rsp => setContentCollection(rsp!))
        httpClient.get<Pilotair.Core.Stores.NoSqlite.DocumentIDictionaryStringObject>(`content/${collection}/${id}`).then(rsp => SetContent(rsp!))
    }, [])

    if (!contentCollection || !content) return

    async function onSave() {
        const value = await dataForm.current?.getValue();
        await httpClient.put(`/content/${collection}/${id}`, value)
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