import { DeleteOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode, useContext } from "react";
import { GlobalModalContext } from "../common/global-modal";
import { httpClient } from "../utils/request";
import { useMenu } from "../workspace/menu";

interface Props {
    children: ReactNode,
    path: string
}

export default function CodeContextMenu({ children, path }: Props) {
    const { modal } = useContext(GlobalModalContext)
    const { loadMenus } = useMenu()

    function onItemClick({ key, domEvent }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
        domEvent.stopPropagation();

        switch (key) {
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