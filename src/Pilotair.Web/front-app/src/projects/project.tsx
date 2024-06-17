import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";

export default function Project() {
    const navigate = useNavigate()
    return (
        <Card
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" onClick={() => navigate("/workspace")} />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Skeleton loading={true} avatar active>
                <Card.Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                    title="Card title"
                    description="This is the description"
                />
            </Skeleton>
        </Card>
    )
}