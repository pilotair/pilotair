import { PlusOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

export default function AddCodeBtn() {
    return (
        <div className="flex group">
            <div className="flex-1">Codes</div>
            <Dropdown trigger={["click"]} menu={{
            items: [{
                key: "file",
                label: "Add file"
            }, {
                key: "folder",
                label: "Add folder"
            }, {
                key: "router",
                label: "Add router"
            }],
        }}>
            <PlusOutlined className="opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()} />
        </Dropdown>
        </div>
    )
}