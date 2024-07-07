import { createDynamicValueIsKeyObject } from "@/utils/object";

export type MenuItemKey = "new" | "edit" | "delete" | "rename" | "close" | "reload";
export const MenuItemKeys = createDynamicValueIsKeyObject<MenuItemKey>()