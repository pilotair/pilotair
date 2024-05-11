import CodeEditor from "../common/code-editor"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { TabContext } from "../common/tab/tab-panel"
import { removeFragment } from "../utils/path";
import { Pilotair } from "../schema"
import { httpClient } from "../utils/request";
import { Breadcrumb } from "antd"
import { ReloadOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";
import { useShortcut } from "../utils/shortcuts";

export default function Code() {
    const { name, loading } = useContext(TabContext);
    const path = removeFragment(name, 1);
    const [content, setContent] = useState("");
    const newContent = useRef<string>()
    const [isChange, setIsChange] = useState(false)
    const shortcutRef = useShortcut({ ctrlOrMeta: true, key: "s" }, onSave);

    useEffect(() => {
        loading(async () => {
            const response = await httpClient.get<Pilotair.Web.Codes.Code>("/__api__/code/", { path });
            if (response?.content) setContent(response.content)
        })
    }, [])

    async function onSave() {
        loading(async () => {
            await httpClient.put("/__api__/code", {
                path,
                content: newContent.current
            })
        })
    }

    const onChange = useCallback((value: string) => {
        newContent.current = value;
        setIsChange(content != newContent.current)
    }, [content])

    return <div className="h-full flex flex-col" ref={shortcutRef}>
        <div className="px-2 flex" >
            <Breadcrumb className="flex-1" separator={<RightOutlined className="transform scale-75" />} items={name.split("/").map(m => ({ title: m, key: m, className: "text-slate-500" }))} />
            <div className="flex-shrink-0 flex gap-2 text-slate-500">
                {isChange && <>
                    <SaveOutlined onClick={onSave} />  <ReloadOutlined />
                </>}

            </div>
        </div>

        <CodeEditor value={content} onChange={onChange} />
    </div>
}