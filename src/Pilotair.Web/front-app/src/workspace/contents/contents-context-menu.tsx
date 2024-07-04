import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode } from "react";
import { useTab } from "@/workspace/use-tab";
import AsyncComponent from "@/common/async-component";

interface Props {
    children: ReactNode,
    path: string
}

export default function ContentsContextMenu({ children, path }: Props) {
    const { openTab } = useTab()

    function onItemClick({ key, domEvent }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
        domEvent.stopPropagation();

        switch (key) {
            case "add":
                openTab({
                    name: path,
                    label: "New collection",
                    panel: <AsyncComponent component={() => import("./new-collection")} props={{
                        path
                    }} />,
                    icon: <FormOutlined />
                })
                break;
            default:
                break;
        }
    }

    const menu: MenuProps = {
        items: [
            {
                key: "add",
                label: <span>Add collection</span>,
                icon: <PlusOutlined />,
                title: ""
            }],
        onClick: onItemClick
    }

    return (
        <Dropdown trigger={["contextMenu"]} menu={menu}>
            <div>
                {children}
            </div>
        </Dropdown>
    )
}