import { lazy, Suspense } from "react"
import { features } from "./features";

interface Props {
    name: string
}

export default function Feature({ name }: Props) {
    const item = features.find(f => f.name == name);
    const Tab = lazy(item!.tab)
    return <Suspense fallback={<div>404</div>} children={<Tab />} />

}