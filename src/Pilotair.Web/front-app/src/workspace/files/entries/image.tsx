import { MenuItemKeys } from "@/common/menus/constants";
import ContextMenu from "@/common/menus/context-menu";
import { Image as AntdImage } from "antd"
import { useState } from "react";

interface Props {
    url: string;
}

export default function Image({ url }: Props) {
    const [preview, setPreview] = useState(false)

    return (
        <ContextMenu items={[
            { key: MenuItemKeys.rename },
            { key: MenuItemKeys.delete }
        ]}>
            <AntdImage
                className="object-contain"
                width={56}
                height={56}
                src={`/${url}`}
                onClick={() => setPreview(true)}
                preview={{
                    visible: preview,
                    src: `/${url}`,
                    onVisibleChange: (value) => {
                        setPreview(value);
                    },
                    mask: false
                }}
            />
        </ContextMenu>
    )
}