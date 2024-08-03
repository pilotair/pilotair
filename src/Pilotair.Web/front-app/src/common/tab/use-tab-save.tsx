import { useContext } from "react";
import { TabContext } from "./context";
import { save } from "../events/sources";
import { useEvent } from "../events/event";
import { useTab } from "@/workspace/use-tab";
import { compareTabKey } from "./utils";

export function useTabSave(action: () => void) {
  const { tabKey } = useContext(TabContext);
  const { activeKey } = useTab();
  useEvent(save, () => {
    if (compareTabKey(tabKey, activeKey)) return;
    action();
  });
}
