import { ReactNode } from "react";
import { Tag } from "antd"
import { CloseOutlined } from "@ant-design/icons";

export interface TagItem {
    key: string
    label?: string,
    icon?: ReactNode,
    closable?: boolean
}

interface Props {
    items: TagItem[],
    activeKey?: string,
    onClose?: (key: string) => void,
    onClick?: (key: string) => void
}



export default function TagGroup({ items, activeKey, onClose, onClick }: Props) {
    const tags: ReactNode[] = [];

    function onTagClose(key: string, e: React.MouseEvent) {
        e.preventDefault();
        onClose?.(key)
    }

    for (const item of items) {
        const isActive = item.key === activeKey;
        const closeIcon = <CloseOutlined style={{ color: isActive ? '#fff' : '#000' }} />
        const tag = <Tag
            key={item.key}
            closeIcon={closeIcon}
            onClose={(e) => onTagClose(item.key, e)}
            bordered={false}
            icon={item.icon}
            className="cursor-pointer"
            color={isActive ? 'blue-inverse' : "default"}
            onClick={() => onClick?.(item.key)}>
            {item.label}
        </Tag>
        tags.push(tag);
    }

    return <div>{tags}</div>
}