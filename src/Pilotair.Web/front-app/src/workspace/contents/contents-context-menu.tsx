import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode } from "react";
import { useTabs } from "../../workspace/tabs";
import AsyncComponent from "../../common/async-component";

interface Props {
    children: ReactNode,
    path: string
}

export default function ContentsContextMenu({ children, path }: Props) {
    const { openTab } = useTabs()

    function onItemClick({ key, domEvent }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
        domEvent.stopPropagation();

        switch (key) {
            case "add":
                openTab(
                    path,
                    "New collection",
                    <AsyncComponent component={() => import("./new-collection")} props={{
                        path
                    }} />,
                    <FormOutlined />
                )
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