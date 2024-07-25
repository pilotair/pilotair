import { lazy, Suspense, useState } from "react";
import Loading from "@/common/basic/loading";
import { Button, Result } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

interface Props {
  component: Parameters<typeof lazy>[0];
  props?: Record<string, unknown>;
}

export default function AsyncComponent({ component, props }: Props) {
  const [Component, setComponent] = useState<ReturnType<typeof lazy>>(
    lazy(withErrorBoundary),
  );

  const errorFallback = (
    <div className="h-full flex items-center justify-center">
      <Result
        status="500"
        title="Loading error, please try again."
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
  );

  async function withErrorBoundary() {
    try {
      return await component();
    } catch (error) {
      return {
        default: () => errorFallback,
      };
    }
  }

  return (
    <Suspense fallback={<Loading className="bg-transparent" show={true} />}>
      <Component {...props} />
    </Suspense>
  );
}
