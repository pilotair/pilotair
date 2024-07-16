import { useContext, useMemo } from "react";
import { createClient, SendParams } from "./client";
import { TabContext } from "@/common/tab/context";
import { message } from "antd";
import { GlobalContext } from "@/common/global-context";

export const prefix = "/__api__/";
export const tokenName = "access_token";

export function useHttpClient() {
    const { loading, modal } = useContext(TabContext);
    const { loading: globalLoading, modal: globalModal } = useContext(GlobalContext);

    const httpClient = useMemo(() => createClient({
        prefix,
        async onRequest(request: Request) {
            const confirm = modal?.confirm ?? globalModal?.confirm
            if (request.method == "DELETE" && confirm) {
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
        async onSend(action) {
            const actionWrap = loading ?? globalLoading
            if (actionWrap) {
                return await actionWrap(action) as typeof action
            }

            return await action;
        }
    }), [loading, globalLoading, modal, globalModal]);

    return { httpClient }
}

