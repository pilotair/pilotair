import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode, useContext } from "react";
import { GlobalModalContext } from "../common/global-modal";
import { httpClient } from "../utils/request";
import { useMenu } from "../workspace/menu";
import { useTabs } from "../workspace/tabs";
import AsyncComponent from "../common/async-component";

interface Props {
    children: ReactNode,
    path: string
}

export default function ContentsContextMenu({ children, path }: Props) {
    const { modal } = useContext(GlobalModalContext)
    const { loadMenus } = useMenu()
    const { openTab } = useTabs()

    function onItemClick({ key, domEvent }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
        domEvent.stopPropagation();

        switch (key) {
            case "add":
                openTab(
                    path,
                    "New collection",
                    <AsyncComponent component={() => import("./collection")} />,
                    <FormOutlined />
                )
                break;
            case "delete":
                modal.confirm({
                    title: "Are you sure delete?",
                    onOk: async () => {
                        await httpClient.delete("/__api__/code", {
                            paths: [path]
                        });
                        loadMenus()
                    }
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
            },
            {
                key: "delete",
                label: <span className="text-red-500">Delete</span>,
                icon: <DeleteOutlined className="text-red-500" />,
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