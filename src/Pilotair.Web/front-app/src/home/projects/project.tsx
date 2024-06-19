import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.svg"

interface Props {
    title: string
}

export default function Project({ title }: Props) {
    const navigate = useNavigate()
    return (
        <Card
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" onClick={() => navigate("/workspace")} />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Skeleton loading={false} avatar active>
                <Card.Meta
                    avatar={<Avatar src={Logo} />}
                    title={title}
                    description="https://dev.pilotair.org"
                />
            </Skeleton>
        </Card>
    )
}