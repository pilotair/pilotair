import { message } from "antd";
import { createClient } from "./client";

export const prefix = "/__api__/";
export const tokenName = "access_token";

export const httpClient = createClient({
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
    }
});