import { Button } from "antd"
import { AppCard } from "./app-card"
import { useState, useEffect } from "react"
import Breadcrumb from "../common/breadcrumb"
import { httpClient, Schemas } from "../api/http-client"
import { CreateProjectModal } from "./create-project-modal"

export default function Home() {
    const [showCreateAppModal, setShowCreateAppModal] = useState(false);
    const [projects, setProjects] = useState<Schemas["Container"][]>([])

    useEffect(() => {
        httpClient.GET("/__api__/Container").then(rsp => setProjects(rsp.data!))
    }, [])

    const onShowNewProjectModal = () => {
        setShowCreateAppModal(true)
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Breadcrumb
                items={[
                    {
                        href: '',
                        title: <span>Apps</span>,
                    },
                ]}
            />

            <Button
                size="large"
                type="primary"
                onClick={onShowNewProjectModal}
            >Create App</Button>

            {showCreateAppModal && <CreateProjectModal onClose={() => setShowCreateAppModal(false)} />}

            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
                {projects!.map((i: Schemas["Container"]) => {
                    return <AppCard key={i.project?.id}></AppCard>
                })}
            </div>
        </div>
    )
}