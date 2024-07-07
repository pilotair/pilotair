import { combine } from "@/utils/path";
import { atom, useAtom } from "jotai";
import { Pilotair } from '@/schema'
import { useHttpClient } from "@/utils/http/use-client";

const folderAtom = atom("")
const entriesAtom = atom<Pilotair.Core.Stores.Files.Entry[]>([])

export function useFile() {
    const [folder, setFolder] = useAtom(folderAtom);
    const [entries, setEntries] = useAtom(entriesAtom);
    const { httpClient } = useHttpClient()

    async function load() {
        const response = await httpClient.get<Pilotair.Core.Stores.Files.Entry[]>("file", {
            folder
        });
        setEntries(response)
    }

    return {
        folder,
        goTo: setFolder,
        entries,
        load,
        openFolder: (name: string) => setFolder(() => combine(folder, name))
    }
}
