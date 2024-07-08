import { useContext, useMemo } from "react";
import { createClient } from "./client";
import { TabContext } from "@/common/tab/context";
import { message } from "antd";
import { GlobalContext } from "@/common/global-context";

export const prefix = "/__api__/";
export const tokenName = "access_token";

function onRequest(request: Request) {
    const token = localStorage.getItem(tokenName);
    if (token) {
        request.headers.set("Authorization", `Bearer ${token}`)
    }
    return request;
}

async function onResponse(response: Response) {
    const bearer = response.headers.get("www-authenticate")
    if (bearer && response.ok) {
        localStorage.setItem(tokenName, bearer)
    }

    if (!response.ok) {
        const error = await response.json();
        message.error(error);
    }

    return response;
}

export function useHttpClient() {
    const { loading } = useContext(TabContext);
    const { loading: globalLoading } = useContext(GlobalContext);

    const httpClient = useMemo(() => createClient({
        prefix,
        onRequest,
        onResponse,
        async onSend(action) {
            if (loading) {
                return await loading(action)
            }

            if (globalLoading) {
                return await globalLoading(action)
            }

            return await action;
        }
    }), [loading, globalLoading]);

    return { httpClient }
}

