import { ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { Button, Checkbox } from "antd"
import EntryItem from "./entry-item"
import CreateFolderBtn from "./create-folder-btn"
import UploadFilesBtn from "./upload-files-btn"
import { DeleteOutlined } from "@ant-design/icons"
import FolderBreadcrumb from "./folder-breadcrumb"
import { useHttpClient } from "@/utils/http/use-client"
import { TabContext } from "@/common/tab/tab-panel"
import Empty from "@/common/empty"
import { Pilotair } from "@/schema"
import ToolbarLayout from "@/common/layout/toolbar-layout"
import { combine } from "@/utils/path"
import { useEvent } from "@/common/events/event"
import { reloadFiles } from "@/common/events/sources"

export default function File() {
    const [folder, setFolder] = useState('');
    const [entries, setEntries] = useState<Pilotair.Core.Stores.Files.Entry[]>();
    const { httpClient } = useHttpClient()
    const [selectedFiles, setSelectedFiles] = useState<Pilotair.Core.Stores.Files.Entry[]>([])
    const { openConfirm } = useContext(TabContext)

    async function load() {
        const response = await httpClient.get<Pilotair.Core.Stores.Files.Entry[]>("file", {
            folder
        });
        setEntries(response)
    }

    useEvent(reloadFiles, load)

    useEffect(() => {
        load();
    }, [folder])

    useEffect(() => {
        setSelectedFiles([])
    }, [folder, entries])

    const indeterminate = useMemo(() => {
        return !!selectedFiles.length && selectedFiles.length !== entries?.length;
    }, [entries, selectedFiles.length])

    const checkAll = useMemo(() => {
        return !!selectedFiles.length && selectedFiles.length === entries?.length
    }, [entries, selectedFiles.length])

    if (!entries) {
        return ""
    }

    const entryItems: ReactNode[] = [];

    for (const entry of entries) {
        entryItems.push(<EntryItem
            selected={selectedFiles.includes(entry)}
            key={entry.name}
            type={entry.type}
            url={entry.relationPath}
            name={entry.name}
            onSelected={(value) => setSelectedFiles(value ? [...selectedFiles, entry] : selectedFiles.filter(f => f !== entry))}
            extension={entry.extension}
            onClick={() => entry.type == "Folder" && setFolder(combine(folder, entry.name))}
        />)
    }

    function onCheckAllClick() {
        if (checkAll) {
            setSelectedFiles([])
        } else {
            setSelectedFiles(entries ?? [])
        }
    }

    async function onDelete() {
        await openConfirm({
            title: "Are you sure delete?"
        })
        const entries = selectedFiles.map(m => m.name);
        await httpClient.delete("file", { entries, folder });
        load();
    }

    const header = <>
        <Checkbox indeterminate={indeterminate} checked={checkAll} className="flex items-center" onClick={onCheckAllClick} disabled={!entries.length}>Check all</Checkbox>

        <div className="flex-1"></div>
        <div className="flex gap-2">
            {!!selectedFiles.length && <Button danger type="primary" icon={<DeleteOutlined />} onClick={onDelete}>Delete</Button>}
            <CreateFolderBtn folder={folder} />
            <UploadFilesBtn folder={folder} />
        </div>
    </>

    const footer = !!folder && <FolderBreadcrumb path={folder} setFolder={setFolder} className="flex-shrink-0" />

    return (
        <ToolbarLayout header={header} footer={footer}>
            {entries.length
                ? <div className="flex flex-wrap gap-1">
                    {entryItems}
                </div>
                : <Empty />
            }
        </ToolbarLayout>
    )
}