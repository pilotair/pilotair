import { useEffect, useState } from "react"
import { Pilotair } from "../schema"
import { httpClient } from "../utils/request";

interface Props {
    collection: string
}

export default function NewContent({ collection }: Props) {
    const [contentCollection, setContentCollection] = useState<Pilotair.Web.Contents.ContentCollection>();
    useEffect(() => {
        httpClient.get<Pilotair.Web.Contents.ContentCollection>("content-collection", { name: collection }).then(rsp => setContentCollection(rsp!))
    }, [])

    return "new content"
}