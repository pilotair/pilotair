import { Typography } from "antd";
import { ReactNode } from "react";

const { Text } = Typography;

interface Props {
    icon: ReactNode,
    label: string
}

export default function Item({ icon, label }: Props) {
    return <div className="flex flex-col h-24 w-24 hover:bg-gray-100 rounded-md p-2">
        <div className="flex-1 flex items-center justify-center text-4xl">
            {icon}
        </div>
        <Text ellipsis className="flex-shrink-0 text-center text-xs">{label}</Text>
    </div>
}