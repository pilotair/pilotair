import { Button, Card, Divider, Form, Input } from "antd";
import LogoIcon from "@/assets/logo.svg"
import { httpClient } from "@/utils/request";

export default function Login() {
    const [form] = Form.useForm();

    async function sign() {
        await form.validateFields();
        const model= form.getFieldsValue();
        var rsp = await httpClient.post<string>("account/password-sign", model);
        console.log(rsp)
    }

    return (
        <Card >
            <div className="w-96 flex justify-center items-center flex-col p-4">
                <img className="h-32 w-32 cursor-default" src={LogoIcon} alt="pilotair" />
                <Divider plain>Login To You Account</Divider>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                    className="w-full"
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button className="w-full" size="large" type="primary" onClick={sign}>
                            Sign
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </Card>
    )
}