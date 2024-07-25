import { Dropdown, MenuProps } from "antd";
import { ReactNode, useMemo } from "react";
import { getMenuItem } from "./constant-items";

export type MenuItem = NonNullable<MenuProps["items"]>[0];

interface Props {
  children: ReactNode;
  items: MenuItem[];
}

export default function ContextMenu({ children, items }: Props) {
  const menuItems = useMemo(() => {
    const result: MenuItem[] = [];
    for (const item of items) {
      const constantItem = getMenuItem(item?.key);
      const mergedItem = { ...constantItem, ...item } as MenuItem;
      if (mergedItem && "onClick" in mergedItem) {
        const onClick = mergedItem.onClick;
        mergedItem.onClick = (e) => {
          e.domEvent.stopPropagation();
          onClick?.(e);
        };
      }
      result.push(mergedItem);
    }
    return result;
  }, [items]);

  return (
    <Dropdown
      trigger={["contextMenu"]}
      menu={{
        items: menuItems,
      }}
    >
      <div>{children}</div>
    </Dropdown>
  );
}
