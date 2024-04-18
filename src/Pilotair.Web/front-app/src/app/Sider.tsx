import { Menu as AntdMenu } from "antd"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { TabsContext } from "./content"
import { WorkspaceContext } from "./workspace"
import { Icon } from "../common/icon"
import { httpClient } from "../utils/request"

type MenuItem = { key: string, icon: ReactNode, label: string }

interface MenuContextValue {
    menus: MenuItem[],
}

export const MenuContext = createContext<MenuContextValue>({} as MenuContextValue)

interface Props {
    children: ReactNode
}

export function MenuContextProvider({ children }: Props) {
    const [menus, setMenus] = useState<MenuItem[]>([]);

    useEffect(() => {
        httpClient.get<{ key: string, label: string, icon: string }[]>("/__api__/menu").then(rsp => {
            setMenus(rsp.map(m => ({
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
        items={menus}
        onClick={({ key }) => openTab(key)}
        selectedKeys={[active]}
        theme="dark"
    />
}