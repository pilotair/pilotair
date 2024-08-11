import { ReactNode } from "react";
import { Dropdown, MenuProps, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { compareTabKey } from "./utils";
import { TabKey } from "./tabs";

export interface TabBarItem extends TabKey {
  label?: ReactNode;
  icon?: ReactNode;
  closable?: boolean;
  contextMenu?: MenuProps;
}

interface Props {
  items: TabBarItem[];
  activeKey?: TabKey;
  onTagClose?: (key: TabKey) => void;
  onTagClick?: (key: TabKey) => void;
}

export default function TabBar({
  items,
  activeKey,
  onTagClose,
  onTagClick,
}: Props) {
  const tags: ReactNode[] = [];

  function handleClose(key: TabKey, e: React.MouseEvent) {
    e.preventDefault();
    onTagClose?.(key);
  }

  for (const item of items) {
    const isActive = compareTabKey(item, activeKey);
    const closeIcon = (
      <CloseOutlined style={{ color: isActive ? "#fff" : "#000" }} />
    );
    let tag = (
      <Tag
        key={item.type + item.name}
        closeIcon={closeIcon}
        onClose={(e) => handleClose(item, e)}
        bordered={false}
        icon={item.icon}
        className="cursor-pointer inline-flex"
        color={isActive ? "blue-inverse" : "default"}
        onClick={() => onTagClick?.(item)}
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
