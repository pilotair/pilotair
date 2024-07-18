import { FormOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { useHttpClient } from "@/utils/http/use-client";
import { useTab } from "@/workspace/use-tab";
import AsyncComponent from "@/common/basic/async-component";
import { combine } from "@/utils/path";
import ContextMenu, { MenuItem } from "@/common/menus/context-menu";
import { MenuItemKeys } from "@/common/menus/constants";
import { useEvent } from "@/common/events/event";
import { reloadMenus } from "@/common/events/sources";

interface Props {
    children: ReactNode,
    path: string,
    name: string
}

export default function CollectionContextMenu({ children, path, name }: Props) {
    const { openTab } = useTab()
    const { httpClient } = useHttpClient()
    const emitReloadMenus = useEvent(reloadMenus)

    function handleEdit() {
        const editPath = combine('edit', path);
        openTab({
            name: editPath,
            label: `Edit ${name}`,
            panel: <AsyncComponent component={() => import("./edit-collection")} props={{ name, path: editPath }} />,
            icon: <FormOutlined />
        })
    }

    async function handleDelete() {
        await httpClient.delete(`content-collection?name=${name}`);
        emitReloadMenus()
    }

    const items: MenuItem[] = [
        { key: MenuItemKeys.edit, label: "Edit Collection", onClick: handleEdit },
        { key: MenuItemKeys.delete, onClick: handleDelete },
    ]


    return (
        <ContextMenu items={items}>
            <div>
                {children}
            </div>
        </ContextMenu>
    )
}