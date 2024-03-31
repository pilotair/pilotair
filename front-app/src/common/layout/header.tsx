import { Layout, Dropdown, Avatar, MenuProps } from "antd"
import { UserOutlined } from '@ant-design/icons';
import LogoIcon from "../../assets/logo.svg"
import { Link } from "react-router-dom"

export default function Header() {

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
    ];

    return <Layout.Header className="h-13">
        <div className="flex items-center h-full">
            <Link className="h-full inline-flex items-center" to={'/'}>
                <img width={48} src={LogoIcon} alt="logo" />
            </Link>
            <div className="flex-1"></div>
            <Dropdown menu={{ items }}>
                <Avatar className="bg-slate-300" icon={<UserOutlined />} />
            </Dropdown>
        </div>
    </Layout.Header>
}