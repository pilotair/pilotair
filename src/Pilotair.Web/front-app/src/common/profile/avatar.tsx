import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Avatar as AntdAvatar, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";


const items: MenuProps['items'] = [
    {
        key: 'logout',
        label: (
            <a>Logout</a>
        ),
    },
];

export default function Avatar() {

    const nav = useNavigate();
    function onMenuClick({ key }: { key: string }) {
        switch (key) {
            case "logout":
                nav("account/login", {
                    replace: true,
                    relative: "route"
                })
                break;

            default:
                break;
        }
    }

    return (
        <Dropdown menu={{ items, onClick: onMenuClick }} >
            <AntdAvatar className="bg-slate-300" icon={<UserOutlined />} />
        </Dropdown>
    )
}