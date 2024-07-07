import { MenuItemKeys } from "@/common/menus/constants";
import ContextMenu from "@/common/menus/context-menu";
import { FileOutlined } from "@ant-design/icons";

export default function Default() {
    return (
        <ContextMenu items={[
            { key: MenuItemKeys.rename },
            { key: MenuItemKeys.delete }
        ]}>
            <FileOutlined className="text-5xl" />
        </ContextMenu>
    )
}