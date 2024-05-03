import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode, useState } from "react";

interface Props {
    label: ReactNode,
    menu: MenuProps
}

export default function MoreBtn({ label, menu }: Props) {
    const [showIcon, setShowIcon] = useState(false)

    return (
        <div className="flex group">
            <div className="flex-1">{label}</div>
            <Dropdown trigger={["click"]} menu={menu} onOpenChange={(e) => setShowIcon(e)} >
                <div className={(showIcon ? "opacity-100" : "opacity-0") + "  transition-all duration-300 group-hover:opacity-100 "} onClick={(e) => e.stopPropagation()}>
                    <MoreOutlined />
                </div>
            </Dropdown>
        </div>
    )
}