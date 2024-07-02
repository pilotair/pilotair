import { DeleteOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode, useContext } from "react";
import { GlobalModalContext } from "@/common/global-modal";
import { httpClient } from "@/utils/request";
import { useMenu } from "@/workspace/use-menu";
import { useTabs } from "@/workspace/tabs";
import AsyncComponent from "@/common/async-component";
import { combine } from "@/utils/path";

interface Props {
    children: ReactNode,
    path: string,
    name: string
}

export default function ContentContextMenu({ children, path, name }: Props) {
    const { modal } = useContext(GlobalModalContext)
    const { loadMenus } = useMenu()
    const { openTab } = useTabs()

    function edit() {
        const editPath = combine('edit', path);
        openTab(
            editPath,
            `Edit ${name}`,
            <AsyncComponent component={() => import("./edit-collection")} props={{ name, path: editPath }} />,
            <FormOutlined />
        )
    }

    function onItemClick({ key, domEvent }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
        domEvent.stopPropagation();

        switch (key) {
            case "edit":
                edit();
                break;
            case "delete":
                modal.confirm({
                    title: "Are you sure delete?",
                    onOk: async () => {
                        await httpClient.delete(`content-collection?name=${name}`);
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
                key: "edit",
                label: <span>Edit collection</span>,
                icon: <EditOutlined />,
                title: ""
            },
            {
                key: "delete",
                label: <span >Delete</span>,
                icon: <DeleteOutlined />,
                title: "",
                danger: true
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