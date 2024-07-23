import { useContext, useMemo } from "react";
import { createClient, SendParams } from "./client";
import { message } from "antd";
import { LoadingContext } from "@/common/loading-context";
import { ModalContext } from "@/common/modal-context";

export const prefix = "/__api__/";
export const tokenName = "access_token";

export function useHttpClient() {
    const { onLoading } = useContext(LoadingContext);
    const { confirm } = useContext(ModalContext);

    const httpClient = useMemo(() => createClient({
        prefix,
        async onRequest(request: Request) {
            if (request.method == "DELETE") {
                const ok = await confirm({
                    title: "Are you sure delete?",
                })
                if (!ok) throw new Error("Cancel delete")
            }
            const token = localStorage.getItem(tokenName);
            if (token) {
                request.headers.set("Authorization", `Bearer ${token}`)
            }
            return request;
        },
        async onResponse(response: Response, request: Request, sendParams: SendParams) {
            const bearer = response.headers.get("www-authenticate")
            if (bearer && response.ok) {
                localStorage.setItem(tokenName, bearer)
            }

            if (!response.ok) {
                const error = await response.json();
                message.error(error);
            } else if (request.method == "POST" && sendParams?.postSuccessMessage !== false) {
                message.success(sendParams?.postSuccessMessage || "Save success")
            } else if (request.method == "PUT" && sendParams?.putSuccessMessage !== false) {
                message.success(sendParams?.putSuccessMessage || "Update success")
            } else if (request.method == "DELETE" && sendParams?.deleteSuccessMessage !== false) {
                message.success(sendParams?.deleteSuccessMessage || "Delete success")
            }

            return response;
        },
        onSend(action) {
            return onLoading(action) as typeof action
        }
    }), [onLoading, confirm]);

    return { httpClient }
}

