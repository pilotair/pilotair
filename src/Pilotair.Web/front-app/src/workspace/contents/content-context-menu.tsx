import { DeleteOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode, useContext } from "react";
import { GlobalContext } from "@/common/global-context";
import { useHttpClient } from "@/utils/http/use-client";
import { useMenu } from "@/workspace/use-menu";
import { useTab } from "@/workspace/use-tab";
import AsyncComponent from "@/common/async-component";
import { combine } from "@/utils/path";

interface Props {
    children: ReactNode,
    path: string,
    name: string
}

export default function ContentContextMenu({ children, path, name }: Props) {
    const { modal } = useContext(GlobalContext)
    const { loadMenus } = useMenu()
    const { openTab } = useTab()
    const { httpClient } = useHttpClient()

    function edit() {
        const editPath = combine('edit', path);
        openTab({
            name: editPath,
            label: `Edit ${name}`,
            panel: <AsyncComponent component={() => import("./edit-collection")} props={{ name, path: editPath }} />,
            icon: <FormOutlined />
        })
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