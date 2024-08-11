import { Layout } from "antd";
import { ReactNode } from "react";

const { Content } = Layout;

interface Props {
  children: ReactNode;
}

export default function BlankLayout({ children }: Props) {
  return (
    <Layout className="absolute inset-0">
      <Content className="flex flex-col justify-center items-center">
        {children}
      </Content>
    </Layout>
  );
}
