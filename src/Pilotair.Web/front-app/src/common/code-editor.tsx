import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { useEffect, useMemo, useRef, useState } from "react";
import { type editor } from "monaco-editor";

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
  value: string;
  onChange?: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: Props) {
  const [element, setElement] = useState<HTMLDivElement | null>();
  const container = useMemo(
    () => (
      <div
        ref={(e) => setElement(e)}
        className="w-full h-full overflow-hidden"
      ></div>
    ),
    [],
  );
  const editor = useRef<editor.IStandaloneCodeEditor>();
  const model = useRef<editor.ITextModel>();
  const valueRef = useRef("");
  const onChangeRef = useRef<(value: string) => void>();
  valueRef.current = value;
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!element) return;
    editor.current = monaco.editor.create(element, {
      fixedOverflowWidgets: true,
      automaticLayout: true,
    });
    model.current = monaco.editor.createModel("", "javascript");
    editor.current.setModel(model.current);
    editor.current.onDidChangeModelContent(() => {
      onChangeRef.current?.(editor.current!.getValue());
    });
    editor.current.setValue(valueRef.current);
  }, [element]);

  useEffect(() => {
    editor.current?.setValue(valueRef.current);
  }, [value]);

  return container;
}

function enableZoomShortcuts() {
  const zoomKey = "monaco-editor-zoom-level";

  const zoomLevel = localStorage.getItem(zoomKey);

  if (!zoomLevel) {
    localStorage.setItem(
      zoomKey,
      monaco.editor.EditorZoom.getZoomLevel().toString(),
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
