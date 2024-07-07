import { FileOutlined } from "@ant-design/icons";
import { Typography, Checkbox } from "antd";
import React, { MouseEvent } from "react";
import Folder from "./entries/folder";
import Image from "./entries/image"
import { Pilotair } from "@/schema";

interface Props {
    type: Pilotair.Core.Stores.Files.EntryType,
    url: string,
    name: string,
    extension?: string
    selected: boolean,
    onSelected: (value: boolean) => void;
    onClick?: (e: React.MouseEvent) => void
}

export default function EntryItem({ type, url, name, selected, onSelected, onClick }: Props) {
    const { Text } = Typography;

    function getPreview() {
        switch (type) {
            case "Folder":
                return <Folder />
            case "Image":
                return <Image url={url} />

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
            <Text className="px-1" ellipsis={true}>{name}</Text>
            <Checkbox checked={selected} className={"absolute top-1 left-1 opacity-0 group-hover:opacity-100" + (selected ? " opacity-100" : "")} onClick={onCheckboxClick} />
        </div>
    )
}

