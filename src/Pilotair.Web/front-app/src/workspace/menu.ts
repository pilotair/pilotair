import { ReactNode, useEffect } from "react"
import { FeatureItem, getFeature } from "./features"
import { atom, useAtom } from "jotai"
import { httpClient } from "../utils/request"
import { Pilotair } from "../schema"
import { combine } from "../utils/path"

type MenuItem = {
    key: string,
    icon?: ReactNode,
    label: ReactNode,
    feature?: FeatureItem,
    children?: MenuItem[],
    className?: string
}

const menusAtom = atom<MenuItem[]>([])

export function useMenu() {
    const [menus, setMenus] = useAtom(menusAtom)

    async function loadMenus() {
        const response = await httpClient.get<Pilotair.Web.MenuItem[]>("/__api__/menu");
        setMenus(mapMenuItem(response ?? [], '') ?? []);

    }

    useEffect(() => {
        loadMenus();
    }, [])

    return {
        menus,
        loadMenus
    }
}



function mapMenuItem(items: Pilotair.Web.MenuItem[], currentPath: string) {
    const result: MenuItem[] = [];

    for (const item of items) {
        const feature = getFeature(item.type);
        let label: ReactNode = item.name;
        if (feature?.label) {
            if (typeof feature.label === "function") {
                label = feature.label(item.name)
            } else {
                label = feature.label
            }
        }

        const key = combine(currentPath, item.name);

        const i: MenuItem = {
            key: key,
            label,
            icon: feature?.icon,
            feature,
        }

        result.push(i)
        if (item.children) {
            i.children = mapMenuItem(item.children, key)
        }
    }

    return result.length ? result : undefined;
}