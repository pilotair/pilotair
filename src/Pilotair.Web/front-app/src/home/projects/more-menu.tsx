import { httpClient } from "@/utils/request";
import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Modal } from "antd";
import { useProject } from "./use-project";

interface Props {
    name: string;
}

export default function MoreMenu({ name }: Props) {
    const { loadProjects } = useProject();

    const items: MenuProps['items'] = [
        {
            key: 'delete',
            danger: true,
            label: "Delete",
            icon: <DeleteOutlined />,
        },
    ];

    function onItemClick({ key, domEvent }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
        domEvent.stopPropagation();

        switch (key) {
            case "delete":
                Modal.confirm({
                    title: "Are you sure delete?",
                    onOk: async () => {
                        await httpClient.delete(`project?name=${name}`);
                        loadProjects();
                    }
                })
                break;
            default:
                break;
        }
    }

    return (
        <Dropdown menu={{ items, onClick: onItemClick }} trigger={["click"]}>
            <EllipsisOutlined />
        </Dropdown>
    )
}