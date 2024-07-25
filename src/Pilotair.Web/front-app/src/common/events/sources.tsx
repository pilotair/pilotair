import { createEventSource } from "./event";

export const reloadContents = createEventSource<string>();
export const reloadFiles = createEventSource();
export const reloadMenus = createEventSource();
export const save = createEventSource();
