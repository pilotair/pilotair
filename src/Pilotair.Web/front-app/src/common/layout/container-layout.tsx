import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import LogoIcon from "@/assets/logo.svg"
import { ReactNode } from "react";

interface Props {
    header: ReactNode
}

export default function ContainerLayout({ header }: Props) {
    const { Content, Header } = Layout

    return (
        <Layout className="absolute inset-0">
            <Header className="flex items-center space-x-2 shadow-md relative">
                <img className="w-10 h-10 cursor-default" src={LogoIcon} alt="pilotair" />
                <h3 className="text-slate-200">Pilotair</h3>
                <div className="w-6"></div>
                {header}

            </Header>
            <div className="h-full overflow-y-auto">
                <Content className="container mx-auto">
                    <Outlet />
                </Content>
            </div>
        </Layout>
    )
}