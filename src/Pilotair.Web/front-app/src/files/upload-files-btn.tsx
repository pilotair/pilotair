import { FileZipOutlined, FolderOpenOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Dropdown, Progress, Segmented, Upload, UploadFile, UploadProps } from "antd";
import { ReactNode, createRef, useState } from "react";
import TabModal from "../common/tab/tab-modal"
import { useFileStore } from "./files-store";

export default function UploadFilesBtn() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [status, setStatus] = useState('all');
    const fileStore = useFileStore()
    const folderUpload = createRef<HTMLSpanElement>()
    const zipUpload = createRef<HTMLSpanElement>()

    const props: UploadProps = {
        name: "files",
        action: `/__api__/file?path=${fileStore.path}`,
        multiple: true,
        showUploadList: false,
        fileList,
        beforeUpload(_file, fileList) {
            setFileList(fileList)
            return true;
        },
        onChange(info) {
            setFileList(info.fileList)
        },
    }

    const fileItems: ReactNode[] = [];

    function onClose() {
        setFileList([]);
        fileStore.loadFiles();
    }

    for (const file of fileList) {
        if (file.status == status || status == 'all') fileItems.push(<div key={file.name}>{file.name} <Progress percent={file.percent} /></div>)
    }

    const footer = (
        <div className="text-center"><Button className="w-full" onClick={onClose}>Close</Button></div>
    )
    const title = (<div className="text-center"><Segmented value={status} onChange={(value) => setStatus(value)} options={["all", 'uploading', 'done', "error"]} /></div>)

    const items = [
        {
            key: 'folder',
            label: "From folder",
            icon: <FolderOpenOutlined />
        },
        {
            key: 'zip',
            label: "From zip",
            icon: <FileZipOutlined />
        }
    ];

    function onMenuClick({ key }: { key: string }) {
        switch (key) {
            case "folder":
                folderUpload.current?.click()
                break;
            case "zip":
                zipUpload.current?.click();
                break;
            default:
                break;
        }
    }

    function buttonsRender(buttons: ReactNode[]) {
        return [<Button type="primary" icon={<UploadOutlined />}>
            Upload
            <Upload {...props} className="absolute inset-0" ><div className="absolute inset-0"></div></Upload>
        </Button>, buttons[1]]
    }

    return <>
        <Dropdown.Button trigger={["click"]} type="primary" menu={{ items, onClick: onMenuClick }} buttonsRender={buttonsRender}></Dropdown.Button>
        <Upload {...{ ...props, directory: true, multiple: false }}><span ref={folderUpload} /></Upload>
        <Upload {...{ ...props, name: "file", action: `/__api__/file/zip?path=${fileStore.path}`, accept: ".zip", multiple: false }}><span ref={zipUpload} /></Upload>
        <TabModal closable={false} open={!!fileList.length} footer={footer} title={title}>
            <div className="max-h-96 overflow-auto">
                {fileItems}
            </div>
        </TabModal>
    </>
}