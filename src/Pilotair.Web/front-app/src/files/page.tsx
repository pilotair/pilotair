import { ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { Button, Checkbox, Divider } from "antd"
import EntryItem from "./entry-item"
import { Entry, useFileStore } from "./files-store"
import CreateFolderBtn from "./create-folder-btn"
import UploadFilesBtn from "./upload-files-btn"
import { DeleteOutlined } from "@ant-design/icons"
import FolderBreadcrumb from "./folder-breadcrumb"
import { httpClient } from "../utils/request"
import { TabContext } from "../common/tab/tab-panel"

export default function File() {
    const { path, loadFiles, files, openFolder } = useFileStore();
    const [selectedFiles, setSelectedFiles] = useState<Entry[]>([])
    const { openConfirm } = useContext(TabContext)

    useEffect(() => {
        loadFiles()
    }, [path, loadFiles]);

    useEffect(() => {
        setSelectedFiles([])
    }, [path, files])

    const entries: ReactNode[] = [];

    for (const file of files) {
        entries.push(<EntryItem
            selected={selectedFiles.includes(file)}
            key={file.name}
            type={file.isFolder ? "folder" : 'text'}
            url=""
            name={file.name}
            onSelected={(value) => setSelectedFiles(value ? [...selectedFiles, file] : selectedFiles.filter(f => f !== file))}
            onClick={() => file.isFolder && openFolder(file.name)}
        />)
    }

    const indeterminate = useMemo(() => {
        return !!selectedFiles.length && selectedFiles.length !== files.length;
    }, [files.length, selectedFiles.length])

    const checkAll = useMemo(() => {
        return !!selectedFiles.length && selectedFiles.length === files.length
    }, [files.length, selectedFiles.length])

    function onCheckAllClick() {
        if (checkAll) {
            setSelectedFiles([])
        } else {
            setSelectedFiles(files)
        }
    }

    async function onDelete() {
        await openConfirm({
            title: "Are you sure delete?"
        })
        const entries = selectedFiles.map(m => m.name);
        await httpClient.delete("/__api__/file", { entries, path });
        loadFiles()
    }

    return (
        <div className="p-4 space-y-4 flex flex-col h-full">
            <div className="flex-shrink-0 space-y-4 ">
                <div className="flex">
                    <Checkbox indeterminate={indeterminate} checked={checkAll} className="flex items-center" onClick={onCheckAllClick} disabled={!files.length}>Check all</Checkbox>
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
                <div className="flex flex-wrap gap-1">
                    {entries}
                </div>
            </div>
            {!!path && <FolderBreadcrumb path={path} className="flex-shrink-0" />}
        </div>
    )
}