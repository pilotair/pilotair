import { combine } from "@/utils/path";
import { atom, useAtom } from "jotai";
import useSWR from "swr";
import { fetcher } from "@/utils/request";
import { Pilotair } from '@/schema'

const folderAtom = atom("")

export function useFile() {
    const [folder, setFolder] = useAtom(folderAtom);
    const filesResponse = useSWR<Pilotair.Core.Stores.Files.Entry[]>(`file?folder=${folder}`, fetcher)

    return {
        folder,
        goTo: setFolder,
        files: filesResponse.data,
        loading: filesResponse.isLoading,
        reload: () => filesResponse.mutate(),
        openFolder: (name: string) => setFolder(() => combine(folder, name))
    }
}
