import { Menu as AntdMenu } from "antd"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { TabsContext } from "./tabs"
import { WorkspaceContext } from "./workspace"
import { Icon } from "../common/Icon"

type MenuItem = { key: string, icon: ReactNode, label: string }

interface MenuContextValue {
    menus: MenuItem[]
}

export const MenuContext = createContext<MenuContextValue>({} as MenuContextValue)

interface Props {
    children: ReactNode
}

export function MenuContextProvider({ children }: Props) {
    const [menus, setMenus] = useState<MenuItem[]>([]);

    useEffect(() => {
        fetch("__api__/menu", {
            method: "GET",
            headers: {
                contentType: "application/json"
            }
        }).then(async rsp => {
            setMenus((await rsp.json()).map(m => ({
                key: m.key,
                label: m.label,
                icon: <Icon name={m.icon} />
            })))
        })
    }, [])

    return <MenuContext.Provider value={{ menus }}>{children}</MenuContext.Provider>
}

export function Menu() {
    const { menus } = useContext(MenuContext)
    const { openTab } = useContext(TabsContext)
    const { active } = useContext(WorkspaceContext)

    return <AntdMenu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={menus}
        onClick={({ key }) => openTab(key)}
        selectedKeys={[active]}
    />
}