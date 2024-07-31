import { Button, Card, Divider, Form, Input } from "antd";
import LogoIcon from "@/assets/logo.svg";
import { useHttpClient } from "@/utils/http/use-client";
import { useNavigate } from "@/common/router";
import { shortcuts, useShortcut } from "@/utils/shortcuts";
import { useRef } from "react";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { httpClient } = useHttpClient();
  const container = useRef<HTMLDivElement>(null);
  useShortcut(shortcuts.enter, handleSignIn, container.current);

  async function handleSignIn() {
    await form.validateFields();
    const model = form.getFieldsValue();
    await httpClient.post<string>("account/password-sign", model, undefined, {
      successMessage: false,
    });
    navigate("@/");
  }

  return (
    <Card>
      <div
        className="w-96 flex justify-center items-center flex-col p-4"
        ref={container}
      >
        <img
          className="h-32 w-32 cursor-default"
          src={LogoIcon}
          alt="pilotair"
        />
        <Divider plain>Sign To You Account</Divider>
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
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full"
              size="large"
              type="primary"
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
}
