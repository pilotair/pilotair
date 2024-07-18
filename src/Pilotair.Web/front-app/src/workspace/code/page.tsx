import CodeEditor from "@/common/code-editor"
import { useCallback, useEffect, useRef, useState } from "react"
import { Pilotair } from "@/schema"
import { useHttpClient } from "@/utils/http/use-client";
import { Breadcrumb } from "antd"
import { ReloadOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";

interface Props {
    name: string,
    folder?: string
}

export default function Code({ name, folder }: Props) {
    const [content, setContent] = useState("");
    const newContent = useRef<string>()
    const [isChange, setIsChange] = useState(false)
    const { httpClient } = useHttpClient()

    useEffect(() => {
        httpClient.get<Pilotair.Web.Codes.Code>("code", { name, folder }).then(rsp => {
            setContent(rsp!.content!)
        })
    }, [])

    async function handleSave() {
        await httpClient.put("code", {
            content: newContent.current
        }, {
            searchParams: {
                name,
                folder,
            }
        })
    }

    const handleChange = useCallback((value: string) => {
        newContent.current = value;
        setIsChange(content != newContent.current)
    }, [content])

    return <div className="h-full flex flex-col">
        <div className="px-2 flex" >
            <Breadcrumb className="flex-1" separator={<RightOutlined className="transform scale-75" />} items={[...folder?.split("/") ?? [], name].map(m => ({ title: m, key: m, className: "text-slate-500" }))} />
            <div className="flex-shrink-0 flex gap-2 text-slate-500">
                {isChange && <>
                    <SaveOutlined onClick={handleSave} />  <ReloadOutlined />
                </>}

            </div>
        </div>

        <CodeEditor value={content} onChange={handleChange} />
    </div>
}