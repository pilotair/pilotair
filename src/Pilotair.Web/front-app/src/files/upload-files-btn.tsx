import { UploadOutlined } from "@ant-design/icons";
import { Button, Progress, Segmented, Upload, UploadFile, UploadProps } from "antd";
import { ReactNode, useState } from "react";
import TabModal from "../common/tab/tab-modal"

interface Props {
    path?: string
}

export default function UploadFilesBtn({ path }: Props) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [status, setStatus] = useState('all');


    const props: UploadProps = {
        name: "files",
        action: `/__api__/file?path=${path}`,
        multiple: true,
        showUploadList: false,
        fileList,
        beforeUpload(_file, FileList) {
            setFileList(FileList)
            return true;
        },
        onChange(info) {
            setFileList(info.fileList)
        },
    }

    const fileItems: ReactNode[] = [];

    for (const file of fileList) {
        if (file.status == status || status == 'all') fileItems.push(<div key={file.name}>{file.name} <Progress percent={file.percent} /></div>)
    }

    const footer = (
        <div className="text-center"><Button className="w-full" onClick={() => setFileList([])}>Close</Button></div>
    )
    const title = (<div className="text-center"><Segmented value={status} onChange={(value) => setStatus(value)} options={["all", 'uploading', 'done', "error"]} /></div>)

    return <>
        <Upload {...props}>
            <Button type="primary" icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <TabModal closable={false} open={!!fileList.length} footer={footer} title={title}>
            <div className="max-h-96 overflow-auto">
                {fileItems}
            </div>
        </TabModal>
    </>
}