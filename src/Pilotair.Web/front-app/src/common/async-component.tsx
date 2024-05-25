import { ComponentType, lazy, LazyExoticComponent, Suspense, useState } from "react"
import Loading from "../common/loading"
import { Button, Result } from "antd";
import { ReloadOutlined } from "@ant-design/icons"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Module = { default: ComponentType<any> };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LazyComponent = LazyExoticComponent<ComponentType<any>>

interface Props {
    component: () => Promise<Module>,
    props?: Record<string, unknown>
}

export default function AsyncComponent({ component, props }: Props) {
    const [Component, setComponent] = useState<LazyComponent>(lazy(wrapErrorBoundary))

    const ErrorFallback = () => (
        <div className="h-full flex items-center justify-center">
            <Result
                status="500"
                title="Sorry, something went wrong."
                extra={
                    <Button icon={<ReloadOutlined />} type="primary" onClick={() => setComponent(lazy(wrapErrorBoundary))}>
                        Reload
                    </Button>
                }
            />
        </div>
    )

    function wrapErrorBoundary() {
        return new Promise<Module>((resolve) => {
            component().then(resolve).catch(() => {
                resolve({
                    default: ErrorFallback
                })
            })
        })
    }

    return <Suspense fallback={<Loading />} children={<Component {...props} />} />
}