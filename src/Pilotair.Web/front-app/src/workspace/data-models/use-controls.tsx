import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useHttpClient } from "@/utils/http/use-client";
import { createDynamicValueIsKeyObject } from "@/utils/object";
import { Pilotair } from "@/schema";

const controlsAtom = atom<string[]>([]);

export const controls = createDynamicValueIsKeyObject<Pilotair.Application.DataModels.ControlTypes>();

export const multipleControls = [controls.File, controls.Select, controls.Content]

export function useControls() {
    const [controls, setControls] = useAtom(controlsAtom);
    const { httpClient } = useHttpClient()

    useEffect(() => {
        httpClient.get<string[]>("/data-model/controls").then(rsp => setControls(rsp!))
    }, [])

    return { controls };
}