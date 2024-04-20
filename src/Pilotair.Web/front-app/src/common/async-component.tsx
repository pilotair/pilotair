import { lazy, Suspense } from "react"
import Loading from "../common/loading"

interface Props {
    component: () => Promise<{ default: React.ComponentType<unknown>; }>
}

export default function AsyncComponent({ component }: Props) {
    const Component = lazy(component)
    return <Suspense fallback={<Loading />} children={<Component />} />
}