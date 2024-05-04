import { Dropdown, Avatar, MenuProps } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const items: MenuProps['items'] = [
    {
        key: 'logout',
        label: (
            <a>Logout</a>
        ),
    },
];

export function Header() {
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

    return <>
        <div className="flex-1"></div>
        <Dropdown menu={{ items, onClick: onMenuClick }} >
            <Avatar className="bg-slate-300" icon={<UserOutlined />} />
        </Dropdown>
    </>
} 