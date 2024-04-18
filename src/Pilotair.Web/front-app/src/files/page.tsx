import { useState } from "react"
import Breadcrumb, { Item } from "../common/breadcrumb"
import { Button, Upload, UploadProps, message, Checkbox, Divider } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import EntryItem from "./entry-item"

export default function File() {
    const [items] = useState<Item[]>([{
        title: "root"
    }])

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

    return (
        <div className="p-4 space-y-4 flex flex-col h-full">
            <div className="flex-shrink-0 space-y-4 ">
                <Breadcrumb items={items} />
                <div className="flex">
                    <div className="flex-1 flex gap-2">
                        <Upload {...props}>
                            <Button type="primary" icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        <Button >Create Folder</Button>
                    </div>
                    <Checkbox className="flex items-center">Check all</Checkbox>
                </div>

                <Divider />
            </div>

            <div className="flex-1 overflow-auto">
                <div className="flex flex-wrap gap-1">
                    <EntryItem type="folder" url="" />
                    <EntryItem type="folder" url="" />
                    <EntryItem type="folder" url="" />
                </div>

                <div className="flex flex-wrap gap-1">
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="text" url="" />
                    <EntryItem type="image" url="/__admin__/src/assets/logo.svg" />
                    <EntryItem type="image" url="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                </div>
            </div>
        </div>
    )
}