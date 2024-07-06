import { createEventSource } from "./event";

export const reloadContents = createEventSource<string>()