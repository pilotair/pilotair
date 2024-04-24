import { AlipayOutlined, FormOutlined, WechatOutlined, ConsoleSqlOutlined, SettingOutlined, LockOutlined, ControlOutlined } from "@ant-design/icons";
import Item from "./item"
import Group from "./group";

export default function Home() {
    return <div className="px-4">
        <Group title="System">
            <Item icon={<SettingOutlined />} label="Settings" />
            <Item icon={<ControlOutlined />} label="Custom Options" />
            <Item icon={<LockOutlined />} label="Authorization" />
        </Group>

        <Group title="Data">
            <Item icon={<FormOutlined />} label="Contents" />
            <Item icon={<ConsoleSqlOutlined />} label="Mysql" />
            <Item icon={<ConsoleSqlOutlined />} label="SqlServer" />
            <Item icon={<ConsoleSqlOutlined />} label="Sqlite" />
        </Group>

        <Group title="Payment">
            <Item icon={<AlipayOutlined />} label="Alipay" />
            <Item icon={<WechatOutlined />} label="WechatPay" />
        </Group>
    </div>
}