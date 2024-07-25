import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Pilotair } from "@/schema";
import { Button, Form, Table } from "antd";
import { useContext, useState } from "react";
import NewForm from "./new-form";
import EditForm from "./edit-form";
import { ModalContext } from "@/common/modals/context";


interface Props {
    value?: Pilotair.Application.DataModels.Field[],
    onChange?: (value: Pilotair.Application.DataModels.Field[]) => void;
}

export default function FieldList({ value, onChange }: Props) {
    const modal = useContext(ModalContext)
    const [list, setList] = useState(value || [])
    const { status } = Form.Item.useStatus();

    function handleDelete(value: Pilotair.Application.DataModels.Field) {
        const result = list.filter(f => f.name != value.name);
        setList(result)
        onChange?.(result)
    }

    function handleNewField(field: Pilotair.Application.DataModels.Field) {
        const result = [...list, field];
        setList(result)
        onChange?.(result)
    }

    function handleNew() {
        modal.open({
            title: "New field",
            children: <NewForm onAddField={handleNewField} />
        })
    }

    function handleUpdateField(value: Pilotair.Application.DataModels.Field) {
        const index = list.findIndex(f => f.name == value.name);
        if (index > -1) {
            list.splice(index, 1, value);
            const result = [...list];
            setList(result)
            onChange?.(result)
        }
    }

    function handleEdit(value: Pilotair.Application.DataModels.Field) {
        modal.open({
            title: "Edit field",
            children: <EditForm field={value} updateField={handleUpdateField} />
        })
    }

    return (<div className={ (status == "error" ? "field-valid-error" : "")}>
        <Table dataSource={list} size="small" rowKey="name" pagination={false} columns={[
            { title: "Name", dataIndex: "name" },
            { title: "Display", dataIndex: "display" },
            { title: "Control", dataIndex: "controlType" },
            {
                title: <Button type="text" shape="circle" icon={<PlusOutlined />} onClick={handleNew} />,
                render(value) {
                    return <div>
                        <Button type="text" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(value)} />
                        <Button type="text" shape="circle" danger icon={<DeleteOutlined />} onClick={() => handleDelete(value)} />
                    </div>
                },
                fixed: "right",
                width: 100,
                align: "end"
            }
        ]} />
    </div>)
}