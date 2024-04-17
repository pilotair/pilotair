import { useState } from "react"
import Breadcrumb, { Item } from "../common/breadcrumb"

export default function File() {
    const [items] = useState<Item[]>([{
        title: "root"
    }])

    return <div className="p-2">
        <Breadcrumb items={items} />
    </div>
}