import { create } from "zustand";
import { httpClient } from "../utils/request";
import { combine } from "../utils/path";

export interface Entry {
    name: string;
    creationTime: string;
    lastWriteTime: string;
    isFolder: boolean
}

interface Store {
    path: string,
    files: Entry[],
    loadFiles: () => Promise<void>,
    openFolder: (folder: string) => void;
    goTo: (folder: string) => void;
}

export const useFileStore = create<Store>((set, get) => ({
    path: '',
    files: [],
    async loadFiles() {
        const { path } = get();
        const files = await httpClient.get<Entry[]>("/__api__/file", {path});
        if (files) set({ files })
    },
    openFolder(folder: string) {
        const { path } = get();
        set({ path: combine(path, folder) })
    },
    goTo(path: string) {
        set({ path: path })
    }
}))