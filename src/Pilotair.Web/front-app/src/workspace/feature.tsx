import { lazy, Suspense } from "react"
import { features } from "./features";
import Loading from "../common/loading"

interface Props {
    name: string
}

export default function Feature({ name }: Props) {
    const item = features.find(f => f.name == name);
    const Component = lazy(item!.tab)
    return <Suspense fallback={<Loading />} children={<Component />} />

}