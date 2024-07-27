import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useHttpClient } from "@/utils/http/use-client";
import { Pilotair } from "@/schema";

type Component = Pilotair.Application.DataModels.IComponent;

const componentsAtom = atom<Component[]>([]);

export function useComponents() {
  const [components, setComponents] = useAtom(componentsAtom);
  const { httpClient } = useHttpClient();

  useEffect(() => {
    httpClient
      .get<Component[]>("/data-model/components")
      .then((rsp) => setComponents(rsp));
  }, [httpClient, setComponents]);

  return { components };
}
