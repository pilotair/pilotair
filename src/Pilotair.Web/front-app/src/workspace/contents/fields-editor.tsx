import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Pilotair } from "@/schema";
import { Button, Table } from "antd";
import { useContext } from "react";
import { TabContext } from "@/common/tab/context";
import NewFieldForm from "./new-field-form";
import EditFieldForm from "./edit-field-form";

interface Props {
    list: Pilotair.Web.DataModels.Field[],
    setList: (value: Pilotair.Web.DataModels.Field[]) => void;
}

export default function FieldsEditor({ list, setList }: Props) {
    const { modal } = useContext(TabContext)

    function onDelete(value: Pilotair.Web.DataModels.Field) {
        setList(list.filter(f => f.name != value.name))
    }

    function onAddField(field: Pilotair.Web.DataModels.Field) {
        setList([...list, field])
    }

    function onAdd() {
        modal.open({
            title: "New field",
            children: <NewFieldForm addField={onAddField} />
        })
    }

    function onUpdateField(value: Pilotair.Web.DataModels.Field) {
        const index = list.findIndex(f => f.name == value.name);
        if (index > -1) {
            list.splice(index, 1, value)
            setList([...list])
        }
    }

    function onEdit(value: Pilotair.Web.DataModels.Field) {
        modal.open({
            title: "Edit field",
            children: <EditFieldForm field={value} updateField={onUpdateField} />
        })
    }

    return <Table dataSource={list} size="small" rowKey="name" pagination={false} columns={[
        { title: "Name", dataIndex: "name" },
        { title: "Display", dataIndex: "display" },
        { title: "Control", dataIndex: "controlType" },
        {
            title: <Button type="text" shape="circle" icon={<PlusOutlined />} onClick={onAdd} />,
            render(value) {
                return <div>
                    <Button type="text" shape="circle" icon={<EditOutlined />} onClick={() => onEdit(value)} />
                    <Button type="text" shape="circle" danger icon={<DeleteOutlined />} onClick={() => onDelete(value)} />
                </div>
            },
            fixed: "right",
            width: 100,
            align: "end"
        }
    ]} />
}