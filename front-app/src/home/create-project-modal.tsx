import { Modal, Form, Input } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useState } from "react"
import { httpClient } from "../api/http-client"

interface Props {
    onClose: () => void
}

interface Model {
    name: string
}

export function CreateProjectModal({ onClose }: Props) {
    const [state, setState] = useState(true)
    const [form] = Form.useForm<Model>()

    const onOk = () => {
        form.submit();
    }

    const onFinish = async (value: Model) => {
        await httpClient.POST("/__api__/Container", {
            body: value
        })
        setState(false)
    }

    return <>
        <Modal title="Basic Modal" afterClose={onClose} open={state} onCancel={() => setState(false)} onOk={onOk}>
            <Form onFinish={onFinish} form={form} layout="vertical">
                <FormItem name="name" rules={[{ required: true }]} label="Name">
                    <Input />
                </FormItem>
            </Form>
        </Modal>
    </>
}