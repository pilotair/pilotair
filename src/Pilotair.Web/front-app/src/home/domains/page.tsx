import { Button, Modal, Table } from "antd";
import NewDomainForm from "./new-domain-form";
import { GlobalModalContext } from "@/common/global-modal"
import { useContext, useEffect } from "react";
import { useDomain } from "./use-domain";
import { DeleteOutlined } from "@ant-design/icons";
import { Pilotair } from "@/schema";
import { httpClient } from "@/utils/request";

export default function Domain() {
    const { openModal } = useContext(GlobalModalContext)
    const { domains, loadDomains } = useDomain()

    useEffect(() => {
        loadDomains()
    }, [])

    function addDomain() {
        openModal({
            title: "New Domain",
            children: <NewDomainForm />
        })
    }

    function removeDomain(value: Pilotair.Web.Domains.DomainModel) {
        Modal.confirm({
            title: "Are you sure delete?",
            async onOk() {
                await httpClient.delete("/domain", { name: value.name });
                loadDomains()
            }
        })
    }

    return (
        <div className="py-6 px-2 space-y-4 h-full">
            <div>
                <Button type="primary" onClick={addDomain}>Add Domain</Button>
            </div>
            <Table dataSource={domains} rowKey="name" columns={[{ title: "Name", dataIndex: "name" }, {
                render(value) {
                    return <div>
                        <Button type="text" shape="circle" danger icon={<DeleteOutlined />} onClick={() => removeDomain(value)} />
                    </div>
                },
                fixed: "right",
                width: 100,
                align: "end"
            }]} pagination={false} />
        </div>
    )
}