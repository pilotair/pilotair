import { ReactNode } from "react";
import { Tag } from "antd"
import { CloseOutlined } from "@ant-design/icons";

export interface TagItem {
    name: string
    label?: ReactNode,
    icon?: ReactNode,
    closable?: boolean
}

interface Props {
    items: TagItem[],
    activeName?: string,
    onTagClose?: (name: string) => void,
    onTagClick?: (name: string) => void
}



export default function TagGroup({ items, activeName, onTagClose, onTagClick }: Props) {
    const tags: ReactNode[] = [];

    function onClose(name: string, e: React.MouseEvent) {
        e.preventDefault();
        onTagClose?.(name)
    }

    for (const item of items) {
        const isActive = item.name === activeName;
        const closeIcon = <CloseOutlined style={{ color: isActive ? '#fff' : '#000' }} />
        const tag = <Tag
            key={item.name}
            closeIcon={closeIcon}
            onClose={(e) =>onClose(item.name, e)}
            bordered={false}
            icon={item.icon}
            className="cursor-pointer inline-flex"
            color={isActive ? 'blue-inverse' : "default"}
            onClick={() => onTagClick?.(item.name)}
        >
            {item.label}
        </Tag>
        tags.push(tag);
    }

    return <div>{tags}</div>
}