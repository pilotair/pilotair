import { MenuItemKeys } from "@/common/menus/constants";
import ContextMenu from "@/common/menus/context-menu";
import { Pilotair } from "@/schema";
import { Image as AntdImage } from "antd"
import { useState } from "react";

interface Props {
    entry: Pilotair.Core.Stores.Files.Entry
}

export default function Image({ entry }: Props) {
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
                src={`/${entry.relationPath}`}
                onClick={() => setPreview(true)}
                preview={{
                    visible: preview,
                    src: `/${entry.relationPath}`,
                    onVisibleChange: (value) => {
                        setPreview(value);
                    },
                    mask: false
                }}
            />
        </ContextMenu>
    )
}