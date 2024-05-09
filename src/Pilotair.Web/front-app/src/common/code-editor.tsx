import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { createRef, useEffect, useRef } from "react";

self.MonacoEnvironment = {
    getWorker(_, label: string) {
        if (label === "json") {
            return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker();
        }
        return new editorWorker();
    },
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

interface Props {
    value: string
}

export default function CodeEditor(props: Props) {
    const ref = createRef<HTMLDivElement>();
    const init = useRef(false)

    useEffect(() => {
        if (!ref.current || init.current) return
        init.current = true;

        const editor = monaco.editor.create(ref.current, {
            language: "html",
            fixedOverflowWidgets: true,
            automaticLayout:true
        })

        const model = monaco.editor.createModel(props.value, "javascript")
        editor.setModel(model);
    }, [ref]);

    return <div ref={ref} className="w-full h-full overflow-hidden"></div>
}