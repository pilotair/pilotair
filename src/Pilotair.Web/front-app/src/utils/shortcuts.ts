import { useEffect, useState } from "react";


interface Shortcut {
    ctrlOrMeta?: boolean,
    shift?: boolean,
    key: string
}

export function useShortcut(shortcut: Shortcut, callback: () => void | Promise<void>) {
    const [element, setElement] = useState<HTMLElement>();
    useEffect(() => {
        if (!element) return;
        const onKeydown = (e: KeyboardEvent) => {
            if (shortcut.ctrlOrMeta && !e.ctrlKey && !e.metaKey) {
                return;
            }
            if (shortcut.shift && !e.shiftKey) return;
            if (shortcut.key != e.key) return;
            e.stopPropagation();
            e.preventDefault();
            callback();
        }
        element.addEventListener("keydown", onKeydown)
        return () => element.removeEventListener("keydown", onKeydown)
    }, [element])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (element: any) => setElement(element);
}