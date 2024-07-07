import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useHttpClient } from "@/utils/http/use-client";

const controlsAtom = atom<string[]>([]);

export function useControls() {
    const [controls, setControls] = useAtom(controlsAtom);
    const { httpClient } = useHttpClient()

    useEffect(() => {
        httpClient.get<string[]>("/data-model/controls").then(rsp => setControls(rsp!))
    }, [])

    return { controls };
}