import { ComponentType, lazy, LazyExoticComponent, Suspense, useState } from "react"
import Loading from "../common/loading"
import { Button, Result } from "antd";
import { ReloadOutlined } from "@ant-design/icons"

type Module = { default: ComponentType<unknown> };
type LazyComponent = LazyExoticComponent<ComponentType<unknown>>

interface Props {
    component: () => Promise<Module>
}

export default function AsyncComponent({ component }: Props) {
    const [Component, setComponent] = useState<LazyComponent>(lazy(wrapErrorBoundary))

    function wrapErrorBoundary() {
        return new Promise<Module>((resolve) => {
            component().then(resolve).catch(() => {
                resolve({
                    default: function ErrorFallback() {
                        return <div className="h-full flex items-center justify-center">
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
                    }
                })
            })
        })
    }

    return <Suspense fallback={<Loading />} children={<Component />} />
}