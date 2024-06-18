import { Pilotair } from "@/schema"
import { httpClient } from "@/utils/request";
import { atom, useAtom } from "jotai"

const domainsAtom = atom<Pilotair.Web.Domains.DomainModel[]>([])

export function useDomain() {
    const [domains, setDomains] = useAtom(domainsAtom);

    async function loadDomains() {
        const result = await httpClient.get<Pilotair.Web.Domains.DomainModel[]>("/domain");
        setDomains(result!)
    }

    return { domains, loadDomains }
}