import Empty from "@/common/basic/empty";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import { Button, Progress, Segmented, SegmentedProps, UploadFile, GetProp, Alert } from "antd";
import { useMemo, useState } from "react";
import { maxUploadFile } from "./upload-files-btn";
import Modal from "@/common/modals/modal";

interface Props {
    files: UploadFile[],
    onClose: () => void
}

type SegmentedOptions = GetProp<SegmentedProps<string>, "options">


const segmentedOptions: SegmentedOptions = [
    { value: "uploading", label: "Uploading", icon: <ClockCircleOutlined className="text-blue-500" /> },
    { value: "done", label: "Done", icon: <CheckCircleOutlined className="text-green-500" /> },
    { value: "error", label: "Error", icon: <ExclamationCircleOutlined className="text-red-500" /> },
]

export function UploadingModal({ files, onClose }: Props) {
    const [status, setStatus] = useState('uploading');

    const options = useMemo(() => {
        const result = []
        for (const i of segmentedOptions) {
            if (typeof i === "string") continue;
            const count = files.filter(f => f.status == i.value).length
            const label = <div className="inline-flex items-center">{i.label}({count}) </div>
            result.push({ ...i, label })
        }
        return result;
    }, [files])

    const items = useMemo(() => {
        const result = []

        for (const file of files) {
            if (file.status == status) {
                result.push(
                    <div key={file.uid}>
                        <div>{file.name}</div>
                        <Progress percent={file.percent} />
                    </div>
                )
            }
        }

        return result;
    }, [files, status])

    const footer = <div className="text-center">
        <Button className="w-full" onClick={onClose}>Close</Button>
    </div>

    const title = <div className="text-center">
        <Segmented block value={status} onChange={setStatus} options={options} />
    </div>

    let content = <Empty />;

    if (files.length > maxUploadFile) {
        content = <Alert
            message="Error"
            description={`A maximum of ${maxUploadFile} files can be uploaded at one time. If more files are uploaded, please use upload from zip!`}
            type="error"
            showIcon
        />
    } else if (items.length > 0) {
        content = <div className="max-h-96 rounded p-2 overflow-auto">
            {items}
        </div>
    }

    return (
        <Modal closable={false} open={!!files.length} footer={footer} title={title}>
            {content}
        </Modal>
    )
}