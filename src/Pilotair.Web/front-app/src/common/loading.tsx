import { Spin } from "antd"
import { useEffect, useState } from "react"

interface Props {
    className?: string
    show: boolean
}

export default function Loading({ className, show }: Props) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(show)
    }, [show])

    return <div className={(visible ? 'opacity-100' : 'opacity-0 pointer-events-none') + " transition-opacity duration-300 flex items-center justify-center h-full bg-black/10 z-50 " + className} >
        <Spin size="large" />
    </div>
}