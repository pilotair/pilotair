import { Form, Input, Select } from "antd"

export default function CreateFileForm() {
    const [form] = Form.useForm();

    async function onFinish(value: { name: string }) {
        // const path = combine(fileStore.folder, value.name);

        // await loading(async () => {
        //     await httpClient.post("/__api__/file", undefined, {
        //         searchParams: { path }
        //     });
        // })

        // await fileStore.reload()
        // closeModal?.()
    }

    return (
        <Form form={form} onFinish={onFinish} preserve={false} layout="vertical">
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input file name!' }]}>
                <Input placeholder="File name" />
            </Form.Item>
        </Form>
    )
}