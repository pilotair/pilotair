import { createDynamicValueIsKeyObject } from "@/utils/object";
import { TabKey } from "./tabs";

export function compareTabKey(left?: TabKey, right?: TabKey) {
  if (!left || !right) return false;
  return left.name == right.name && left.type == right.type;
}

type TabKeyType = "list" | "new" | "edit";

export const tabKeyTypes = createDynamicValueIsKeyObject<TabKeyType>();
