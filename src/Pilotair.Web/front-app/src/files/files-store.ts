import { combine } from "../utils/path";
import { atom, useAtom } from "jotai";
import useSWR from "swr";
import { fetcher } from "../utils/request";
import { Pilotair } from '../schema'

const pathAtom = atom("")

export function useFile() {
    const [path, setPath] = useAtom(pathAtom);
    const filesResponse = useSWR<Pilotair.Web.Files.Entry[]>(`/__api__/file?path=${path}`, fetcher)

    return {
        path,
        goTo: setPath,
        files: filesResponse.data,
        loading: filesResponse.isLoading,
        reload: () => filesResponse.mutate(),
        openFolder: (folder: string) => setPath(() => combine(path, folder))
    }
}
