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
enableZoomShortcuts();

interface Props {
    value: string,
    onChange?: (value: string) => void,
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
            automaticLayout: true,
        });

        if (props.onChange) {
            editor.onDidChangeModelContent(() => {
                props.onChange?.(editor.getValue());
            })
        }


        const model = monaco.editor.createModel(props.value, "javascript")
        editor.setModel(model);
    }, [ref]);

    return <div ref={ref} className="w-full h-full overflow-hidden"></div>
}

function enableZoomShortcuts() {
    const zoomKey = "monaco-editor-zoom-level";

    const zoomLevel = localStorage.getItem(zoomKey);

    if (!zoomLevel) {
        localStorage.setItem(
            zoomKey,
            monaco.editor.EditorZoom.getZoomLevel().toString()
        );
    } else {
        monaco.editor.EditorZoom.setZoomLevel(parseInt(zoomLevel));
    }

    monaco.editor.EditorZoom.onDidChangeZoomLevel((e) => {
        localStorage.setItem(zoomKey, e.toString());
    });

    monaco.editor.addKeybindingRules([
        {
            keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Equal,
            command: "editor.action.fontZoomIn",
        },
        {
            keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Minus,
            command: "editor.action.fontZoomOut",
        },
        {
            keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Digit0,
            command: "editor.action.fontZoomReset",
        },
    ]);
}