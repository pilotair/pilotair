import { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Button, Checkbox } from "antd"
import EntryItem from "./entry-item"
import UploadFilesBtn from "./upload-files-btn"
import { DeleteOutlined, FolderAddOutlined } from "@ant-design/icons"
import FolderBreadcrumb from "./folder-breadcrumb"
import { useHttpClient } from "@/utils/http/use-client"
import Empty from "@/common/basic/empty"
import { Pilotair } from "@/schema"
import ToolbarLayout from "@/common/layout/toolbar-layout"
import { combine } from "@/utils/path"
import { useEvent } from "@/common/events/event"
import { reloadFiles } from "@/common/events/sources"
import { TabContext } from "@/common/tab/context"
import NewFolderModal from "./new-folder-modal"

export default function File() {
    const [folder, setFolder] = useState('');
    const [entries, setEntries] = useState<Pilotair.Core.Stores.Files.Entry[]>();
    const { httpClient } = useHttpClient()
    const [selectedFiles, setSelectedFiles] = useState<Pilotair.Core.Stores.Files.Entry[]>([])
    const { modal } = useContext(TabContext)

    const load = useCallback(async () => {
        const response = await httpClient.get<Pilotair.Core.Stores.Files.Entry[]>("file", {
            folder
        });
        setEntries(response)
    }, [folder, httpClient])

    useEvent(reloadFiles, load)

    useEffect(() => {
        load();
    }, [folder, load])

    useEffect(() => {
        setSelectedFiles([])
    }, [folder, entries])

    const indeterminate = useMemo(() => {
        return !!selectedFiles.length && selectedFiles.length !== entries?.length;
    }, [entries, selectedFiles.length])

    const handleCheckAll = useMemo(() => {
        return !!selectedFiles.length && selectedFiles.length === entries?.length
    }, [entries, selectedFiles.length])

    if (!entries) {
        return
    }

    const entryItems: ReactNode[] = [];

    for (const entry of entries) {
        entryItems.push(<EntryItem
            key={entry.hash}
            selected={selectedFiles.includes(entry)}
            entry={entry}
            onSelected={(value) => setSelectedFiles(value ? [...selectedFiles, entry] : selectedFiles.filter(f => f !== entry))}
            onClick={() => entry.type == "Folder" && setFolder(combine(folder, entry.name))}
            onDelete={() => handleDelete([entry.name])}
        />)
    }

    function handleCheckAllClick() {
        if (handleCheckAll) {
            setSelectedFiles([])
        } else {
            setSelectedFiles(entries ?? [])
        }
    }

    function handleNewFolder() {
        modal.open({
            title: "New folder",
            children: <NewFolderModal folder={folder} />
        })
    }

    async function handleDelete(entries?: string[]) {
        entries = entries || selectedFiles.map(m => m.name);
        await httpClient.delete("file", { entries, folder });
        load();
    }

    const header = <>
        <Checkbox indeterminate={indeterminate} checked={handleCheckAll} className="flex items-center" onClick={handleCheckAllClick} disabled={!entries.length}>Check all</Checkbox>

        <div className="flex-1"></div>
        <div className="flex gap-2">
            {!!selectedFiles.length && <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => handleDelete()}>Delete</Button>}
            <Button ghost icon={<FolderAddOutlined />} type="primary" onClick={handleNewFolder}>Create Folder</Button>
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