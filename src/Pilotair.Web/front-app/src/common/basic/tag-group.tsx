import { ReactNode } from "react";
import { Dropdown, MenuProps, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export interface TagItem {
  name: string;
  label?: ReactNode;
  icon?: ReactNode;
  closable?: boolean;
  contextMenu?: MenuProps;
}

interface Props {
  items: TagItem[];
  activeName?: string;
  onTagClose?: (name: string) => void;
  onTagClick?: (name: string) => void;
}

export default function TagGroup({
  items,
  activeName,
  onTagClose,
  onTagClick,
}: Props) {
  const tags: ReactNode[] = [];

  function handleClose(name: string, e: React.MouseEvent) {
    e.preventDefault();
    onTagClose?.(name);
  }

  for (const item of items) {
    const isActive = item.name === activeName;
    const closeIcon = (
      <CloseOutlined style={{ color: isActive ? "#fff" : "#000" }} />
    );
    let tag = (
      <Tag
        key={item.name}
        closeIcon={closeIcon}
        onClose={(e) => handleClose(item.name, e)}
        bordered={false}
        icon={item.icon}
        className="cursor-pointer inline-flex"
        color={isActive ? "blue-inverse" : "default"}
        onClick={() => onTagClick?.(item.name)}
      >
        {item.label}
      </Tag>
    );
    if (item.contextMenu) {
      tag = (
        <Dropdown
          trigger={["contextMenu"]}
          key={item.name}
          menu={item.contextMenu}
        >
          {tag}
        </Dropdown>
      );
    }
    tags.push(tag);
  }

  return <div>{tags}</div>;
}
