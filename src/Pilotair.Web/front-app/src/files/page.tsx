import { ReactNode, useEffect, useState } from "react"
import { Button, Checkbox, Divider } from "antd"
import EntryItem from "./entry-item"
import { Entry, useFileStore } from "./files-store"
import CreateFolderBtn from "./create-folder-btn"
import UploadFilesBtn from "./upload-files-btn"
import { DeleteOutlined } from "@ant-design/icons"
import FolderBreadcrumb from "./folder-breadcrumb"

export default function File() {
    const { path, loadFiles, files, openFolder } = useFileStore();
    const [selectedFiles, setSelectedFiles] = useState<Entry[]>([])

    useEffect(() => {
        loadFiles()
    }, [path, loadFiles])

    const folders: ReactNode[] = [];
    const items1: ReactNode[] = [];

    for (const file of files) {
        if (file.isFolder) {
            folders.push(<EntryItem
                selected={selectedFiles.includes(file)}
                key={file.name}
                type="folder"
                url=""
                name={file.name}
                onSelected={() => setSelectedFiles(selectedFiles.includes(file) ? selectedFiles.filter(f => f !== file) : [...selectedFiles, file])}
                onClick={() => openFolder(file.name)}
            />)
        } else {
            items1.push(<EntryItem
                selected={selectedFiles.includes(file)}
                key={file.name}
                type="text"
                url=""
                name={file.name}
                onSelected={() => setSelectedFiles(selectedFiles.includes(file) ? selectedFiles.filter(f => f !== file) : [...selectedFiles, file])}
            />)
        }
    }

    return (
        <div className="p-4 space-y-4 flex flex-col h-full">
            <div className="flex-shrink-0 space-y-4 ">
                <div className="flex">
                    <Checkbox className="flex items-center flex-1">Check all</Checkbox>
                    <div className=" flex gap-2">
                        {!!selectedFiles.length && <Button danger type="primary" icon={<DeleteOutlined />}>Delete</Button>}
                        <CreateFolderBtn />
                        <UploadFilesBtn />
                    </div>
                </div>

                <Divider />
            </div>

            <div className="flex-1 overflow-auto">
                <div className="flex flex-wrap gap-1">
                    {folders}
                </div>

                <div className="flex flex-wrap gap-1">
                    {items1}
                </div>
            </div>
            {!!path && <FolderBreadcrumb path={path} className="flex-shrink-0" />}
        </div>
    )
}