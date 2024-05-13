import { DeleteOutlined, FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode, useContext } from "react";
import { GlobalModalContext } from "../common/global-modal";
import { useNewFolderModal } from "./use-new-folder-modal";

interface Props {
    children: ReactNode
}

export default function FolderContextMenu({ children }: Props) {
    const { openModal, modal } = useContext(GlobalModalContext)
    const openNewFolderModal = useNewFolderModal();

    function onItemClick({ key, domEvent }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
        domEvent.stopPropagation();

        switch (key) {
            case "file":
                openModal({
                    children: <div>aaa</div>
                })
                break;
            case "folder":
                openNewFolderModal()
                break;
            case "delete":
                modal.confirm({
                    title: "Are you sure delete?",
                    onOk: () => {
                        
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