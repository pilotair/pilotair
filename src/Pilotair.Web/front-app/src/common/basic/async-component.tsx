import { ComponentType, lazy, LazyExoticComponent, Suspense, useState } from "react"
import Loading from "@/common/basic/loading"
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
    const [Component, setComponent] = useState<LazyComponent>(lazy(withErrorBoundary))

    const ErrorFallback = () => (
        <div className="h-full flex items-center justify-center">
            <Result
                status="500"
                title="Sorry, something went wrong."
                extra={
                    <Button
                        icon={<ReloadOutlined />}
                        type="primary"
                        onClick={() => setComponent(lazy(withErrorBoundary))}
                    >
                        Reload
                    </Button>
                }
            />
        </div>
    )

    async function withErrorBoundary() {
        try {
            return await component();
        } catch (error) {
            return {
                default: ErrorFallback
            }
        }
    }

    return <Suspense fallback={<Loading className="bg-transparent" show={true} />} children={<Component {...props} />} />
}