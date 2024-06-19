import { Pilotair } from "@/schema"
import { httpClient } from "@/utils/request";
import { atom, useAtom } from "jotai"

const projectsAtom = atom<Pilotair.Web.Projects.ProjectModel[]>([])

export function useProject() {
    const [projects, setProjects] = useAtom(projectsAtom);

    async function loadProjects() {
        const result = await httpClient.get<Pilotair.Web.Projects.ProjectModel[]>("/project");
        setProjects(result!)
    }

    return { projects, loadProjects }
}