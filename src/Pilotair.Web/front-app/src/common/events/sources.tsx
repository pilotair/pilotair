import { createEventSource } from "./event";

export const save = createEventSource();
export const reloadFiles = createEventSource();
export const reloadMenus = createEventSource();
export const deleteContentCollection = createEventSource<string>();
export const reloadContents = createEventSource<string>();
