import { useContext } from "react";
import { TabsContext } from "@/workspace/main-tabs";
import { TabContext } from "@/common/tab/context";
import { useEvent } from "@/common/events/event";
import { save } from "@/common/events/sources";
import { compareTabKey } from "@/common/tab/utils";

export function useTabSave(action: () => void) {
  const { activeKey } = useContext(TabsContext);
  const { tabKey } = useContext(TabContext);
  useEvent(save, () => {
    if (compareTabKey(tabKey, activeKey)) return;
    action();
  });
}
