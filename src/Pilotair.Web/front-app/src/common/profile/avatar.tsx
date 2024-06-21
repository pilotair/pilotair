import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Avatar as AntdAvatar, MenuProps } from "antd";
import { useLocation } from "wouter";


const items: MenuProps['items'] = [
    {
        key: 'logout',
        label: (
            <a>Logout</a>
        ),
    },
];

export default function Avatar() {

    const [location, setLocation] = useLocation();
    function onMenuClick({ key }: { key: string }) {
        switch (key) {
            case "logout":
                setLocation("~/__admin__/account/login")
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