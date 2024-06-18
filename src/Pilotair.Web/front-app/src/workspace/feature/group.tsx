import { Typography } from "antd";
import { ReactNode } from "react";

const { Title } = Typography;

interface Props {
    children: ReactNode,
    title: string
}

export default function Group({ children, title }: Props) {
    return (
        <div>
            <Title level={4} >{title}</Title>
            <div className="flex gap-2 flex-wrap">
                {children}
            </div>
        </div>
    )
}