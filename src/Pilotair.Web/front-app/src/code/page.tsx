import useSWR from "swr"
import CodeEditor from "../common/code-editor"

export default function Code() {

    useSWR("/__api__/code/")

    return <CodeEditor />
}