import { Button } from "antd";
import Project from "./project"
import { useProject } from "./use-project";
import { useEffect } from "react";

export default function Home() {
    const { projects, loadProjects } = useProject();

    useEffect(() => {
        loadProjects();
    }, [])

    return (
        <div className="py-6 px-2 space-y-4 h-full">
            <div>
                <Button type="primary">Add project</Button>
            </div>
            <div className="gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {projects.map(p => <Project title={p.name ?? ""} />)}
            </div>
        </div>
    )
}