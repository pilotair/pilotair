import { Button, Table } from "antd";

export default function Domain() {
    return (
        <div className="py-6 px-2 space-y-4 h-full">
            <div>
                <Button type="primary">Add Domain</Button>
            </div>
            <Table columns={[{ title: "Name" }]} />
        </div>
    )
}