import { Button, Modal } from "antd"
import { AppCard } from "./app-card"
import { useState } from "react"
import Breadcrumb from "../common/breadcrumb"
import { NavLink } from "react-router-dom"

export default function Home() {
    const [showCreateAppModal, setShowCreateAppModal] = useState(false);

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
                onClick={() => setShowCreateAppModal(true)}
            >Create App</Button>

            <Modal title="Basic Modal" open={showCreateAppModal} onCancel={() => setShowCreateAppModal(false)} >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
                <NavLink to={"app"}>   <AppCard></AppCard></NavLink>
                <AppCard></AppCard>
                <AppCard></AppCard>
                <AppCard></AppCard>
                <AppCard></AppCard>
                <AppCard></AppCard>
            </div>
        </div>
    )
}