import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { httpClient } from "../../utils/request";

const controlsAtom = atom<string[]>([]);

export function useControls() {
    const [controls, setControls] = useAtom(controlsAtom);

    useEffect(() => {
        httpClient.get<string[]>("/data-model/controls").then(rsp => setControls(rsp!))
    }, [])

    return { controls };
}