import { MenuItemKeys } from "@/common/menus/constants";
import ContextMenu from "@/common/menus/context-menu";
import { Pilotair } from "@/schema";
import { FolderTwoTone } from "@ant-design/icons";

interface Props {
    entry: Pilotair.Core.Stores.Files.Entry
}

export default function Folder({ entry }: Props) {
    return (
        <ContextMenu items={[
            { key: MenuItemKeys.rename },
            { key: MenuItemKeys.delete }
        ]}>
            <FolderTwoTone className="text-7xl" />
        </ContextMenu>
    )
}