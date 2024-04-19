import { ReactNode, useEffect, useState } from "react"
import Breadcrumb, { Item } from "../common/breadcrumb"
import { Checkbox, Divider } from "antd"
import EntryItem from "./entry-item"
import { useFileStore } from "./files-store"
import CreateFolderBtn from "./create-folder-btn"
import UploadFilesBtn from "./upload-files-btn"

export default function File() {
    const [items] = useState<Item[]>([{
        title: "root"
    }])

    const { path, loadFiles, files } = useFileStore();

    useEffect(() => {
        loadFiles()
    }, [path])

    const folders: ReactNode[] = [];
    const items1: ReactNode[] = [];

    for (const file of files) {
        if (file.isFolder) {
            folders.push(<EntryItem key={file.name} type="folder" url="" name={file.name} />)
        } else {
            items1.push(<EntryItem key={file.name} type="text" url="" name={file.name} />)
        }
    }

    return (
        <div className="p-4 space-y-4 flex flex-col h-full">
            <div className="flex-shrink-0 space-y-4 ">
                <Breadcrumb items={items} />
                <div className="flex">
                    <div className="flex-1 flex gap-2">
                        <UploadFilesBtn />
                        <CreateFolderBtn />
                    </div>
                    <Checkbox className="flex items-center">Check all</Checkbox>
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
        </div>
    )
}