import { FileZipOutlined, FolderOpenOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Dropdown, Upload, UploadFile, UploadProps } from "antd";
import { ReactNode, useRef, useState } from "react";
import { combine } from "@/utils/path";
import upload from "rc-upload/es/request"
import { prefix } from "@/utils/http/use-client";
import { useEvent } from "@/common/events/event";
import { reloadFiles } from "@/common/events/sources";
import { UploadingModal } from "./uploading-modal";

interface Props {
    folder: string
}


export default function UploadFilesBtn({ folder }: Props) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const folderUpload = useRef<HTMLSpanElement>(null)
    const zipUpload = useRef<HTMLSpanElement>(null)
    const emitReloadFiles = useEvent(reloadFiles)

    const props: UploadProps = {
        name: "files",
        action: combine(prefix, "file"),
        multiple: true,
        showUploadList: false,
        fileList,
        beforeUpload(_file, files) {
            if (files.length > 500) return false
            setFileList(files)
            return true;
        },
        onChange(info) {
            if (info.fileList.length > 500) return false
            setFileList(info.fileList)
        },
        customRequest(options) {
            const file = options.file as File;
            const webkitRelativePath = file.webkitRelativePath;
            if (webkitRelativePath) {
                const fragments = webkitRelativePath.split("/");
                fragments.shift();
                fragments.pop();
                folder = combine(folder, ...fragments);
            }
            options.action = options.action + `?folder=${folder}`
            upload(options);
        }
    }

    function onClose() {
        setFileList([]);
        emitReloadFiles();
    }

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

    return <div className="flex">
        <Dropdown.Button trigger={["click"]} type="primary" menu={{ items, onClick: onMenuClick }} buttonsRender={buttonsRender}></Dropdown.Button>
        <Upload className="hidden" {...{
            ...props, directory: true, multiple: false
        }}><span ref={folderUpload} /></Upload>
        <Upload className="hidden" {...{ ...props, name: "file", action: combine(prefix, "file", "zip"), accept: ".zip", multiple: false }}><span ref={zipUpload} /></Upload>
        <UploadingModal files={fileList} onClose={onClose} />
    </div>
}