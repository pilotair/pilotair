import { MenuItemKeys } from "@/common/menus/constants";
import ContextMenu from "@/common/menus/context-menu";
import { FolderTwoTone } from "@ant-design/icons";

export default function Folder() {
    return (
        <ContextMenu items={[
            { key: MenuItemKeys.rename },
            { key: MenuItemKeys.delete }
        ]}>
            <FolderTwoTone className="text-7xl" />
        </ContextMenu>
    )
}