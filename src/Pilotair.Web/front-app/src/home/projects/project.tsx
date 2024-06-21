import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Skeleton } from "antd";
import Logo from "@/assets/logo.svg"
import { base } from "@/common/router";
import MoreMenu from "./more-menu";

interface Props {
    name: string,
    title: string,
    url?: string
}

export default function Project({ name, title, url }: Props) {
    return (
        <Card
            actions={[
                <SettingOutlined key="setting" />,
                <a href={`${url}${base}/workspace`} target="blank"><EditOutlined key="edit" /></a>,
                <MoreMenu key="ellipsis" name={name} />,
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