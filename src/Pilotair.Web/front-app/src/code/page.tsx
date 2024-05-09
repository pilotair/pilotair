import useSWR from "swr"
import CodeEditor from "../common/code-editor"
import { useContext } from "react"
import { TabContext } from "../common/tab/tab-panel"
import { removeFragment } from "../utils/path";
import { Pilotair } from "../schema"
import { fetcher } from "../utils/request";
import Loading from "../common/loading";
import { Breadcrumb } from "antd"
import { ReloadOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";

export default function Code() {
    const { name } = useContext(TabContext);
    const path = removeFragment(name, 1);
    const { data, isLoading } = useSWR<Pilotair.Web.Codes.Code>(`/__api__/code/?path=${path}`, fetcher)

    if (isLoading) return <Loading />
    return <div className="h-full flex flex-col">
        <div className="px-2 flex" >
            <Breadcrumb className="flex-1" separator={<RightOutlined className="transform scale-75" />} items={name.split("/").map(m => ({ title: m, key: m, className: "text-slate-500" }))} />
            <div className="flex-shrink-0 flex gap-2 text-slate-500">
                <SaveOutlined />
                <ReloadOutlined />
            </div>
        </div>

        <CodeEditor value={data?.content ?? ''} />
    </div>
}