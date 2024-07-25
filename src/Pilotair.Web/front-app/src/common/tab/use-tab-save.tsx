import { useContext } from "react";
import { TabContext } from "./context";
import { save } from "../events/sources";
import { useEvent } from "../events/event";
import { useTab } from "@/workspace/use-tab";

export function useTabSave(action: () => void) {
  const { name } = useContext(TabContext);
  const { activeName } = useTab();
  useEvent(save, () => {
    if (name != activeName) return;
    action();
  });
}
