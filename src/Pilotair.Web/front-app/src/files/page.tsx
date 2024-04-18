import { ReactNode, useEffect, useState } from "react"
import Breadcrumb, { Item } from "../common/breadcrumb"
import { Button, Upload, UploadProps, message, Checkbox, Divider } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import EntryItem from "./entry-item"
import { useFileStore } from "./files-store"
import CreateFolderBtn from "./create-folder-btn"

export default function File() {
    const [items] = useState<Item[]>([{
        title: "root"
    }])

    const { path, loadFiles, files } = useFileStore();

    useEffect(() => {
        loadFiles()
    }, [path])

    const props: UploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const folders: ReactNode[] = [];
    const items1: ReactNode[] = [];

    for (const file of files) {
        if (file.isFolder) {
            folders.push(<EntryItem type="folder" url="" name={file.name} />)
        } else {
            items1.push(<EntryItem type="text" url="" name={file.name} />)
        }
    }

    return (
        <div className="p-4 space-y-4 flex flex-col h-full">
            <div className="flex-shrink-0 space-y-4 ">
                <Breadcrumb items={items} />
                <div className="flex">
                    <div className="flex-1 flex gap-2">
                        <Upload {...props}>
                            <Button type="primary" icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
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