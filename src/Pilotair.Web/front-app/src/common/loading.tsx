import { Spin } from "antd"

interface Props {
    className?: string
}

export default function Loading({ className }: Props) {
    return <div className={"flex items-center justify-center h-full bg-white/30 " + className} >
        <Spin size="large" />
    </div>
}