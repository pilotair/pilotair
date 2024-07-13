import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Pilotair } from "@/schema";
import { Button, Form, Table, theme } from "antd";
import { useContext, useState } from "react";
import { TabContext } from "@/common/tab/context";
import NewForm from "./new-form";
import EditForm from "./edit-form";


interface Props {
    value?: Pilotair.Web.DataModels.Field[],
    onChange?: (value: Pilotair.Web.DataModels.Field[]) => void;
}

export default function FieldList({ value, onChange }: Props) {
    const { modal } = useContext(TabContext)
    const [list, setList] = useState(value || [])
    const { status } = Form.Item.useStatus();
    const { token } = theme.useToken();

    function onDelete(value: Pilotair.Web.DataModels.Field) {
        const result = list.filter(f => f.name != value.name);
        setList(result)
        onChange?.(result)
    }

    function onAddField(field: Pilotair.Web.DataModels.Field) {
        const result = [...list, field];
        setList(result)
        onChange?.(result)
    }

    function onAdd() {
        modal.open({
            title: "New field",
            children: <NewForm addField={onAddField} />
        })
    }

    function onUpdateField(value: Pilotair.Web.DataModels.Field) {
        const index = list.findIndex(f => f.name == value.name);
        if (index > -1) {
            list.splice(index, 1, value);
            const result = [...list];
            setList(result)
            onChange?.(result)
        }
    }

    function onEdit(value: Pilotair.Web.DataModels.Field) {
        modal.open({
            title: "Edit field",
            children: <EditForm field={value} updateField={onUpdateField} />
        })
    }

    return <Table style={{
        border: status == 'error' ? (token.colorError + " solid 1px") : undefined
    }} dataSource={list} size="small" rowKey="name" pagination={false} columns={[
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