import { create } from "zustand";
import { httpClient } from "../utils/request";

export interface Entry {
    name: string;
    creationTime: string;
    lastWriteTime: string;
    isFolder: boolean
}

interface Store {
    path?: string,
    files: Entry[],
    loadFiles: () => Promise<void>
}

export const useFileStore = create<Store>((set, get) => ({
    path: '',
    files: [],
    async loadFiles() {
        const { path } = get();
        const files = await httpClient.get<Entry[]>(`/__api__/file?path=${path}`);
        set({ files })
    }
}))