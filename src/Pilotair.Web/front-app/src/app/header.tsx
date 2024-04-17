import { Dropdown, Avatar, MenuProps } from "antd"
import { UserOutlined } from "@ant-design/icons"

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

export function Header() {
    return <>
        <div className="flex-1">
            
        </div>
        <Dropdown menu={{ items }}>
            <Avatar className="bg-slate-300" icon={<UserOutlined />} />
        </Dropdown>
    </>
} 