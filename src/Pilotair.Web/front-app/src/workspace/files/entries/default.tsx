import { MenuItemKeys } from "@/common/menus/constants";
import ContextMenu from "@/common/menus/context-menu";
import { TabContext } from "@/common/tab/context";
import { Pilotair } from "@/schema";
import { FileOutlined } from "@ant-design/icons";
import { useContext } from "react";
import RenameForm from "../rename-form";

interface Props {
    entry: Pilotair.Core.Stores.Files.Entry
}

export default function Default({ entry }: Props) {
    const { openModal } = useContext(TabContext)

    function rename() {
        openModal({
            title: "Rename",
            children: <RenameForm path={entry.relationPath} />
        })
    }

    return (
        <ContextMenu items={[
            { key: MenuItemKeys.rename, onClick: rename },
            { key: MenuItemKeys.delete }
        ]}>
            <FileOutlined className="text-5xl" />
        </ContextMenu>
    )
}