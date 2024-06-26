import { combine } from "@/utils/path";
import { atom, useAtom } from "jotai";
import { httpClient } from "@/utils/request";
import { Pilotair } from '@/schema'
import { useEffect } from "react";

const folderAtom = atom("")
const entriesAtom = atom<Pilotair.Core.Stores.Files.Entry[]>([])

export function useFile() {
    const [folder, setFolder] = useAtom(folderAtom);
    const [entries, setEntries] = useAtom(entriesAtom);

    async function load() {
        const response = await httpClient.get<Pilotair.Core.Stores.Files.Entry[]>("file", {
            folder
        });
        setEntries(response!)
    }

    useEffect(() => {
        load()
    }, [folder])

    return {
        folder,
        goTo: setFolder,
        entries,
        load,
        openFolder: (name: string) => setFolder(() => combine(folder, name))
    }
}
