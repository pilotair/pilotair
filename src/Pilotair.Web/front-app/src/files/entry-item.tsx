import { FileOutlined, FolderTwoTone } from "@ant-design/icons";
import { Typography, Checkbox } from "antd";

interface Props {
    type: 'folder' | "text" | "image",
    url: string
}

export default function EntryItem({ type, url }: Props) {
    const { Text } = Typography;

    function getPreview() {
        switch (type) {
            case "folder":
                return <FolderTwoTone className="text-6xl" />

            case "image":
                return <div className="w-14 h-14 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${url}')` }}></div>

            default:
                return <FileOutlined className="text-5xl" />
        }
    }

    return (
        <div className=" w-28 h-28 inline-flex flex-col items-center justify-center hover:bg-gray-300 rounded-md relative group">

            <div className="w-16 h-16 flex justify-center items-center">
                {getPreview()}
            </div>
            <Text>text file</Text>
            <Checkbox className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" />
        </div>
    )
}

