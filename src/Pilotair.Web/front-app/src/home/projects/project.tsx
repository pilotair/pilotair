import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Skeleton } from "antd";
import Logo from "@/assets/logo.svg"
import { useNavigate, base } from "@/common/router";

interface Props {
    title: string,
    url?: string
}

export default function Project({ title, url }: Props) {
    const nav = useNavigate()

    return (
        <Card
            actions={[
                <SettingOutlined key="setting" />,
                <a href={`${url}${base}/workspace`} target="blank"><EditOutlined key="edit" /></a>,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Skeleton loading={false} avatar active>
                <Card.Meta
                    avatar={<Avatar src={Logo} />}
                    title={title}
                    description={url}
                />
            </Skeleton>
        </Card>
    )
}