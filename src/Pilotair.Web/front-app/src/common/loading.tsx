import { Spin } from "antd"

export default function Loading() {

    return <div className="flex items-center justify-center h-full" >
        <Spin size="large" />
    </div>
}