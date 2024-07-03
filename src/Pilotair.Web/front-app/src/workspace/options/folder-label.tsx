import { MenuProps } from "antd";
import { useTab } from "@/workspace/use-tab"
import MoreBtn from "@/common/menu/more-btn";
import AsyncComponent from "@/common/async-component";
import { ControlOutlined } from "@ant-design/icons";

export default function OptionsFolderLabel() {
    const { openTab } = useTab();

    function onItemClick({ key }: { key: string }) {
        switch (key) {
            case "options":
                openTab(
                    "CreateOptions",
                    "New Options",
                    <AsyncComponent component={() => import("../options/create-options")} />,
                    <ControlOutlined />
                )
                break;

            default:
                break;
        }
    }

    const menu: MenuProps = {
        items: [{
            key: "options",
            label: "Create Options"
        }],
        onClick: onItemClick
    }

    return <MoreBtn label="Options" menu={menu} />
}

