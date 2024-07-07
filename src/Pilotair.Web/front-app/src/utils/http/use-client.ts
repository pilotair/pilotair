import { useContext } from "react";
import { createClient } from "./client";
import { TabContext } from "@/common/tab/tab-panel";
import { message } from "antd";

export const prefix = "/__api__/";
export const tokenName = "access_token";



export function useHttpClient() {
    const tabContext = useContext(TabContext)

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
            try {
                tabContext.showLoading?.(true)
                return await action
            } finally {
                tabContext.showLoading?.(false)
            }
        }
    });

    return { httpClient }
}

