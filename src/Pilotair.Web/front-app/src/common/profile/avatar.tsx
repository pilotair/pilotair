import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Avatar as AntdAvatar, MenuProps } from "antd";
import { useNavigate } from "@/common/router";


const items: MenuProps['items'] = [
    {
        key: 'logout',
        label: (
            <a>Logout</a>
        ),
    },
];

export default function Avatar() {

    const navigate = useNavigate();
    function handleMenuClick({ key }: { key: string }) {
        switch (key) {
            case "logout":
                navigate("@/account/login")
                break;

            default:
                break;
        }
    }

    return (
        <Dropdown menu={{ items, onClick: handleMenuClick }} >
            <AntdAvatar className="bg-slate-300" icon={<UserOutlined />} />
        </Dropdown>
    )
}