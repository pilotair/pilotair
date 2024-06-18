import { Button } from "antd";
import Project from "./project"

export default function Home() {
    return (
        <div className="py-6 px-2 space-y-4 h-full">
            <div>
                <Button type="primary">Add project</Button>
            </div>
            <div className="gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
            </div>
        </div>
    )
}