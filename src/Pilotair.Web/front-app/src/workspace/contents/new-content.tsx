import { useEffect, useRef, useState } from "react"
import { Pilotair } from "@/schema"
import { useHttpClient } from "@/utils/http/use-client";
import { Button, Divider } from "antd";
import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import DataForm, { DataFormRef } from "@/workspace/data-models/data-form";
import { useTab } from "../use-tab";
import { useEvent } from "@/common/events/event";
import { reloadContents } from "@/common/events/sources";

interface Props {
    collection: string,
    path: string
}

export default function NewContent({ collection, path }: Props) {
    const [contentCollection, setContentCollection] = useState<Pilotair.Web.Contents.ContentCollectionModel>();
    const dataForm = useRef<DataFormRef>();
    const { closeTab } = useTab()
    const emitReloadContents = useEvent(reloadContents);
    const { httpClient } = useHttpClient()

    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollectionModel>("content-collection", { name: collection }).then(rsp => setContentCollection(rsp!))
    }, [])

    if (!contentCollection) return

    async function onSave() {
        const value = await dataForm.current?.getValue();
        await httpClient.post(`/content/${collection}`, value);
        closeTab(path)
        emitReloadContents(collection)
    }

    return (
        <div className="p-4 h-full flex flex-col space-y-4">
            <div className="flex items-center gap-2 flex-shrink-0">
                <Button icon={<ReloadOutlined />}>Reset</Button>
                <div className="flex-1"></div>
                <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>
            </div>
            <Divider className="flex-shrink-0" />
            <DataForm fields={contentCollection.fields} ref={dataForm} />
        </div>
    )
}