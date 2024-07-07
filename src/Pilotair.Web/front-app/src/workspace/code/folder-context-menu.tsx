import { DeleteOutlined, FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode, useContext } from "react";
import { GlobalContext } from "@/common/global-context";
import { useNewFolderModal } from "./use-new-folder-modal";
import CreateFileForm from "./create-file-form";
import { useHttpClient } from "@/utils/http/use-client";
import { useMenu } from "@/workspace/use-menu";

interface Props {
    children: ReactNode,
    path: string
}

export default function FolderContextMenu({ children, path }: Props) {
    const { openModal, modal } = useContext(GlobalContext)
    const openNewFolderModal = useNewFolderModal();
    const { loadMenus } = useMenu()
    const { httpClient } = useHttpClient()

    function onItemClick({ key, domEvent }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
        domEvent.stopPropagation();

        switch (key) {
            case "file":
                openModal({
                    title: "Create file",
                    children: <CreateFileForm path={path} />,
                })
                break;
            case "folder":
                openNewFolderModal()
                break;
            case "delete":
                modal.confirm({
                    title: "Are you sure delete?",
                    onOk: async () => {
                        await httpClient.delete("code", {
                            paths: [path]
                        });
                        loadMenus();
                    }
                })
                break;
            default:
                break;
        }
    }

    const menu: MenuProps = {
        items: [{
            key: "file",
            label: <div>New file</div>,
            icon: <FileAddOutlined />,
            title: ""
        }, {
            key: "folder",
            label: "New folder",
            icon: <FolderAddOutlined />,
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