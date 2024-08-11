import { useEffect } from "react";

interface Shortcut {
  ctrlOrMeta?: boolean;
  shift?: boolean;
  key: string;
}

export const shortcuts = {
  save: { ctrlOrMeta: true, key: "s" } as Shortcut,
  enter: { key: "Enter" } as Shortcut,
};

export function useShortcut(
  shortcut: Shortcut,
  callback: () => void | Promise<void>,
  element?: HTMLElement | null,
) {
  useEffect(() => {
    const target = element ?? document.body;
    const onKeydown = (e: KeyboardEvent) => {
      if (shortcut.ctrlOrMeta && !e.ctrlKey && !e.metaKey) {
        return;
      }
      if (shortcut.shift && !e.shiftKey) return;
      if (shortcut.key != e.key) return;
      e.stopPropagation();
      e.preventDefault();
      callback();
    };
    target.addEventListener("keydown", onKeydown);
    return () => target.removeEventListener("keydown", onKeydown);
  }, [element, shortcut, callback]);
}
