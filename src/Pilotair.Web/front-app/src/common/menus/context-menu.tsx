import { Dropdown, MenuProps } from "antd";
import { ReactNode, useMemo } from "react";
import { getMenuItem } from "./constant-items";

export type MenuItem = NonNullable<MenuProps["items"]>[0]

interface Props {
    children: ReactNode;
    items: MenuItem[]
}

export default function ContextMenu({ children, items }: Props) {
    const menuItems = useMemo(() => {
        const result: MenuItem[] = [];
        for (const item of items) {
            const constantItem = getMenuItem(item?.key);
            result.push({ ...constantItem, ...item } as MenuItem)
        }
        return result;
    }, [items])

    return (
        <Dropdown trigger={["contextMenu"]} menu={{
            items: menuItems
        }}>
            <div>
                {children}
            </div>
        </Dropdown>
    )
}