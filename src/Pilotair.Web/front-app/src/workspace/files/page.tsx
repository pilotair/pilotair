import { ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { Button, Checkbox, Divider } from "antd"
import EntryItem from "./entry-item"
import { useFile } from "./files-store"
import CreateFolderBtn from "./create-folder-btn"
import UploadFilesBtn from "./upload-files-btn"
import { DeleteOutlined } from "@ant-design/icons"
import FolderBreadcrumb from "./folder-breadcrumb"
import { httpClient } from "@/utils/request"
import { TabContext } from "@/common/tab/tab-panel"
import Empty from "@/common/empty"
import { Pilotair } from "@/schema"

export default function File() {
    const { folder, entries, openFolder, load } = useFile();
    const [selectedFiles, setSelectedFiles] = useState<Pilotair.Core.Stores.Files.Entry[]>([])
    const { openConfirm, loading } = useContext(TabContext)

    useEffect(() => {
        setSelectedFiles([])
    }, [folder, entries])

    useEffect(() => {
        loading(load)
    }, [])

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

    for (const file of entries) {
        entryItems.push(<EntryItem
            selected={selectedFiles.includes(file)}
            key={file.name}
            type={file.isFolder ? "folder" : 'text'}
            url=""
            name={file.name}
            onSelected={(value) => setSelectedFiles(value ? [...selectedFiles, file] : selectedFiles.filter(f => f !== file))}
            extension={file.extension}
            onClick={() => file.isFolder && openFolder(file.name)}
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
        loading(load);
    }

    return (
        <div className="p-4 space-y-3 flex flex-col h-full">
            <div className="flex-shrink-0 space-y-4 ">
                <div className="flex items-center">
                    <Checkbox indeterminate={indeterminate} checked={checkAll} className="flex items-center" onClick={onCheckAllClick} disabled={!entries.length}>Check all</Checkbox>
                    <div className="flex-1"></div>
                    <div className="flex gap-2">
                        {!!selectedFiles.length && <Button danger type="primary" icon={<DeleteOutlined />} onClick={onDelete}>Delete</Button>}
                        <CreateFolderBtn />
                        <UploadFilesBtn />
                    </div>
                </div>

                <Divider />
            </div>

            <div className="flex-1 overflow-auto">
                {entries.length
                    ? <div className="flex flex-wrap gap-1">
                        {entryItems}
                    </div>
                    : <Empty />
                }
            </div>
            {!!folder && <FolderBreadcrumb path={folder} className="flex-shrink-0" />}
        </div>
    )
}