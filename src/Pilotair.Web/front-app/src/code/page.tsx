import useSWR from "swr"
import CodeEditor from "../common/code-editor"
import { useContext } from "react"
import { TabContext } from "../common/tab/tab-panel"
import { removeFragment } from "../utils/path";
import { Pilotair } from "../schema"
import { fetcher } from "../utils/request";
import Loading from "../common/loading";

export default function Code() {
    const { name } = useContext(TabContext);
    const path = removeFragment(name, 1);
    const { data, isLoading } = useSWR<Pilotair.Web.Codes.Code>(`/__api__/code/?path=${path}`, fetcher)

    if (isLoading) return <Loading />
    return <div className="h-full flex flex-col">
        <div> path: {path}</div>
        <CodeEditor value={data?.content ?? ''} />
    </div>
}