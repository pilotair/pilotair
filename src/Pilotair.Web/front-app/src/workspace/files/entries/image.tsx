import { MenuItemKeys } from "@/common/menus/constants";
import ContextMenu from "@/common/menus/context-menu";

interface Props {
    url: string;
}

export default function Image({ url }: Props) {
    return (
        <ContextMenu items={[
            { key: MenuItemKeys.rename },
            { key: MenuItemKeys.delete }
        ]}>
            <div className="w-14 h-14 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${url}')` }}></div>
        </ContextMenu>
    )
}