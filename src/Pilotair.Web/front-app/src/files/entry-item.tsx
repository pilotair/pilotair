import { FileOutlined, FolderTwoTone } from "@ant-design/icons";
import { Typography, Checkbox } from "antd";
import React, { MouseEvent } from "react";

interface Props {
    type: 'folder' | "text" | "image",
    url: string,
    name: string,
    extension?: string
    selected: boolean,
    onSelected: (value: boolean) => void;
    onClick?: (e: React.MouseEvent) => void
}

export default function EntryItem({ type, url, name, selected, onSelected, onClick, extension }: Props) {
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

    function onCheckboxClick(e: MouseEvent) {
        e.stopPropagation();
        onSelected(!selected)
    }

    return (
        <div className={"w-28 h-28 inline-flex flex-col items-center justify-center hover:bg-gray-300 rounded-md relative group" + (selected ? " bg-blue-300/30" : "")}  >
            <div onClick={onClick} className="w-16 h-16 flex justify-center items-center cursor-pointer">
                {getPreview()}
            </div>
            <Text ellipsis={{
                suffix: extension,
                tooltip: name,
            }} >{name}</Text>
            <Checkbox checked={selected} className={"absolute top-1 left-1 opacity-0 group-hover:opacity-100" + (selected ? " opacity-100" : "")} onClick={onCheckboxClick} />
        </div>
    )
}

