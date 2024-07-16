import { FormOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { useTab } from "@/workspace/use-tab";
import AsyncComponent from "@/common/basic/async-component";
import ContextMenu, { MenuItem } from "@/common/menus/context-menu";
import { MenuItemKeys } from "@/common/menus/constants";
import { combine } from "@/utils/path";

interface Props {
    children: ReactNode,
    path: string
}

export default function CollectionsContextMenu({ children, path }: Props) {
    const { openTab } = useTab()

    function onNew() {
        path = combine("new", path)
        openTab({
            name: path,
            label: "New collection",
            panel: <AsyncComponent
                component={() => import("./new-collection")}
                props={{
                    path
                }} />,
            icon: <FormOutlined />
        })
    }

    const items: MenuItem[] = [
        { key: MenuItemKeys.new, label: "New Collection", onClick: onNew }
    ]

    return (
        <ContextMenu items={items}>
            <div>
                {children}
            </div>
        </ContextMenu>
    )
}