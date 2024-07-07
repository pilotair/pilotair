import { useContext } from "react";
import { createClient } from "./client";
import { TabContext } from "@/common/tab/tab-panel";
import { message } from "antd";
import { GlobalContext } from "@/common/global-context";

export const prefix = "/__api__/";
export const tokenName = "access_token";

export function useHttpClient() {
    const tabContext = useContext(TabContext)
    const globalContext = useContext(GlobalContext)

    const httpClient = createClient({
        prefix,
        onRequest(request) {
            const token = localStorage.getItem(tokenName);
            if (token) {
                request.headers.set("Authorization", `Bearer ${token}`)
            }
            return request;
        },
        async onResponse(response) {
            const bearer = response.headers.get("www-authenticate")
            if (bearer && response.ok) {
                localStorage.setItem(tokenName, bearer)
            }

            if (!response.ok) {
                const error = await response.json();
                message.error(error);
            }

            return response;
        },
        async onSend(action) {
            if (tabContext.loading) {
                return await tabContext.loading(action)
            }

            if (globalContext.loading) {
                return await globalContext.loading(action)
            }

            return await action;
        }
    });

    return { httpClient }
}

