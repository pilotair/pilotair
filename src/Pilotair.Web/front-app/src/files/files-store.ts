import { combine } from "../utils/path";
import { atom, useAtom } from "jotai";
import useSWR from "swr";
import { fetcher } from "../utils/request";

export interface Entry {
    name: string;
    creationTime: string;
    lastWriteTime: string;
    isFolder: boolean,

    extension: string
}

const pathAtom = atom("")

export function useFile() {
    const [path, setPath] = useAtom(pathAtom);
    const filesResponse = useSWR<Entry[]>(`/__api__/file?path=${path}`, fetcher)

    return {
        path,
        goTo: setPath,
        files: filesResponse.data,
        loading: filesResponse.isLoading,
        reload: () => filesResponse.mutate(),
        openFolder: (folder: string) => setPath(() => combine(path, folder))
    }
}
