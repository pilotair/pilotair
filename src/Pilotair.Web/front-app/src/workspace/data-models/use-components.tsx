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
    async function load() {
      let response = await httpClient.get<Component[]>(
        "/data-model/components",
      );
      response = response.sort((left, right) => left.index - right.index);
      setComponents(response);
    }

    load();
  }, [httpClient, setComponents]);

  return { components };
}
