import { FileOutlined, FolderTwoTone } from "@ant-design/icons";
import { Typography, Checkbox } from "antd";
import React from "react";

interface Props {
    type: 'folder' | "text" | "image",
    url: string,
    name: string,
    selected: boolean,
    onSelected: (e: React.MouseEvent) => void;
    onClick?: (e: React.MouseEvent) => void
}

export default function EntryItem({ type, url, name, selected, onSelected, onClick }: Props) {
    const { Text } = Typography;

    function getPreview() {
        switch (type) {
            case "folder":
                return <FolderTwoTone className="text-7xl" />

            case "image":
                return <div className="w-14 h-14 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${url}')` }}></div>

            default:
                return <FileOutlined className="text-5xl" />
        }
    }

    return (
        <div className=" w-28 h-28 inline-flex flex-col items-center justify-center hover:bg-gray-300 rounded-md relative group" onClick={onClick} >

            <div className="w-16 h-16 flex justify-center items-center">
                {getPreview()}
            </div>
            <Text>{name}</Text>
            <Checkbox checked={selected} className="absolute top-1 left-1 opacity-0 group-hover:opacity-100" onClick={onSelected} />
        </div>
    )
}

