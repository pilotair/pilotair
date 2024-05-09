import useSWR from "swr"
import CodeEditor from "../common/code-editor"
import { useContext, useRef, useState } from "react"
import { TabContext } from "../common/tab/tab-panel"
import { removeFragment } from "../utils/path";
import { Pilotair } from "../schema"
import { fetcher, httpClient } from "../utils/request";
import Loading from "../common/loading";
import { Breadcrumb } from "antd"
import { ReloadOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";

export default function Code() {
    const { name, loading } = useContext(TabContext);
    const path = removeFragment(name, 1);
    const { data, isLoading } = useSWR<Pilotair.Web.Codes.Code>(`/__api__/code/?path=${path}`, fetcher);
    const content = useRef(data?.content)
    const [isChange, setIsChange] = useState(false)

    async function onSave() {
        if (!content.current) return;
        await loading(async () => {
            await httpClient.put("/__api__/code", {
                path,
                content: content.current
            })
        })
    }

    function onChange(value: string) {
        content.current = value;
        setIsChange(content.current != data?.content)
    }


    if (isLoading) return <Loading />
    return <div className="h-full flex flex-col">
        <div className="px-2 flex" >
            <Breadcrumb className="flex-1" separator={<RightOutlined className="transform scale-75" />} items={name.split("/").map(m => ({ title: m, key: m, className: "text-slate-500" }))} />
            <div className="flex-shrink-0 flex gap-2 text-slate-500">
                {isChange && <>
                    <SaveOutlined onClick={onSave} />  <ReloadOutlined />
                </>}

            </div>
        </div>

        <CodeEditor value={data?.content ?? ''} onChange={onChange} />
    </div>
}