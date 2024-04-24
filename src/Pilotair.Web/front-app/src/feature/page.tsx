import { Typography } from "antd";
import { AlipayOutlined, FormOutlined, WechatOutlined, ConsoleSqlOutlined, SettingOutlined, LockOutlined, ControlOutlined } from "@ant-design/icons";


const { Title, Text } = Typography;
export default function Home() {
    return <div className="px-4">
        <Title level={4} >Data</Title>
        <div className="flex gap-2">
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <FormOutlined className="text-4xl" />
                </div>
                <Text className="flex-shrink-0 text-center">Contents</Text>
            </div>
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <ConsoleSqlOutlined className="text-4xl" />
                </div>
                <Text className="flex-shrink-0 text-center">Mysql</Text>
            </div>
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <ConsoleSqlOutlined className="text-4xl" />
                </div>
                <Text className="flex-shrink-0 text-center">SqlServer</Text>
            </div>
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <ConsoleSqlOutlined className="text-4xl" />
                </div>
                <Text className="flex-shrink-0 text-center">Sqlite</Text>
            </div>
        </div>
        <Title level={4} >Payment</Title>
        <div className="flex gap-2">
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <AlipayOutlined className="text-4xl" />
                </div>
                <Text className="flex-shrink-0 text-center">Alipay</Text>
            </div>
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <WechatOutlined className="text-4xl" />
                </div>
                <Text className="flex-shrink-0 text-center">Alipay</Text>
            </div>
        </div>
        <Title level={4} >System</Title>
        <div className="flex gap-2">
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <SettingOutlined className="text-4xl" />
                </div>
                <Text className="flex-shrink-0 text-center">Settings</Text>
            </div>
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <ControlOutlined className="text-4xl" />
                </div>
                <Text ellipsis className="flex-shrink-0 text-center">Custom Options</Text>
            </div>
            <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
                <div className="flex-1 flex items-center justify-center">
                    <LockOutlined className="text-4xl" />
                </div>
                <Text ellipsis className="flex-shrink-0 text-center">Authorization</Text>
            </div>
        </div>
    </div>
}