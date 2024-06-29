import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Pilotair } from "@/schema";
import { Button, Table } from "antd";
import { useContext } from "react";
import { TabContext } from "@/common/tab/tab-panel";
import NewFieldForm from "./new-field-form";

interface Props {
    list: Pilotair.Web.DataModels.Field[],
    setList: (value: Pilotair.Web.DataModels.Field[]) => void;
}

export default function FieldsEditor({ list, setList }: Props) {
    const { openModal } = useContext(TabContext)

    function add(field: Pilotair.Web.DataModels.Field) {
        setList([...list, field])
    }

    function remove(value: Pilotair.Web.DataModels.Field) {
        setList(list.filter(f => f.name != value.name))
    }

    function onAdd() {
        openModal({
            title: "New field",
            children: <NewFieldForm addField={add} />
        })
    }

    return <Table dataSource={list} size="small" pagination={false} columns={[
        { title: "Name", dataIndex: "name" },
        { title: "Display", dataIndex: "display" },
        { title: "Control", dataIndex: "controlType" },
        {
            title: <Button type="text" shape="circle" icon={<PlusOutlined />} onClick={onAdd} />,
            render(value) {
                return <div>
                    <Button type="text" shape="circle" icon={<EditOutlined />} onClick={() => remove(value)} />
                    <Button type="text" shape="circle" danger icon={<DeleteOutlined />} onClick={() => remove(value)} />
                </div>
            },
            fixed: "right",
            width: 100,
            align: "end"
        }
    ]} />
}