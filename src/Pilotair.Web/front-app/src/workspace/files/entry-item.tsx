import { Typography, Checkbox } from "antd";
import { MouseEvent } from "react";
import Folder from "./entries/folder";
import Image from "./entries/image"
import { Pilotair } from "@/schema";
import Default from "./entries/default";

interface Props {
    entry: Pilotair.Core.Stores.Files.Entry,
    selected: boolean,
    onSelected: (value: boolean) => void;
    onClick?: (e: React.MouseEvent) => void
}

export default function EntryItem({ entry, selected, onSelected, onClick }: Props) {
    const { Text } = Typography;

    function getPreview() {
        switch (entry.type) {
            case "Folder":
                return <Folder entry={entry} />
            case "Image":
                return <Image entry={entry} />

            default:
                return <Default entry={entry} />
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
            <Text className="px-1" ellipsis={true}>{entry.name}</Text>
            <Checkbox checked={selected} className={"absolute top-1 left-1 opacity-0 group-hover:opacity-100" + (selected ? " opacity-100" : "")} onClick={onCheckboxClick} />
        </div>
    )
}

