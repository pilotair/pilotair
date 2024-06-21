import { Button } from "antd";
import Project from "./project"
import { useProject } from "./use-project";
import { useContext, useEffect } from "react";
import { GlobalModalContext } from "@/common/global-modal";
import NewProjectForm from "./new-project-form";

export default function Home() {
    const { projects, loadProjects } = useProject();
    const { openModal } = useContext(GlobalModalContext)
    useEffect(() => {
        loadProjects();
    }, [])

    function addProject() {
        openModal({
            title: "New Project",
            children: <NewProjectForm />
        })
    }

    return (
        <div className="py-6 px-2 space-y-4 h-full">
            <div>
                <Button type="primary" onClick={addProject}>Add project</Button>
            </div>
            <div className="gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {projects.map(p => <Project key={p.name} title={p.name ?? ""} url={p.url} />)}
            </div>
        </div>
    )
}