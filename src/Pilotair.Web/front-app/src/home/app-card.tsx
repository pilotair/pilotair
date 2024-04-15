import { Avatar, Card, Skeleton } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta";

export function AppCard() {

    return (
        <Card
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Skeleton avatar active>
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
                    title="Card title"
                    description="This is the description"
                />
            </Skeleton>
        </Card>
    )
}