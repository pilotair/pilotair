import { combine } from "./path";

type SearchParams = Record<string, string | string[] | undefined>;

interface ClientOptions {
    prefix?: string,
    onResponse?: (response: Response) => void
    onRequest?: (request: Request) => void
}

interface SendParams {
    searchParams?: SearchParams
    body?: unknown,
    headers?: Record<string, string>,
    onResponse?: (response: Response) => void,
    onRequest?: (request: Request) => void
}
type SupportMethods = "GET" | "POST" | "PUT" | "DELETE";

async function send<T>(url: string, method: SupportMethods, sendParams?: SendParams) {
    const urlObject = new URL(url, URL.canParse(url) ? undefined : location.origin)

    if (sendParams?.searchParams) {
        for (const key in sendParams.searchParams) {
            const value = sendParams.searchParams[key];
            if (!value) continue;
            if (typeof value == "string") {
                urlObject.searchParams.append(key, value);
            } else {
                for (const i of value) {
                    urlObject.searchParams.append(key, i);
                }
            }
        }
    }

    const headers = sendParams?.headers ?? {};
    let body: string | FormData | undefined;

    if (!(sendParams?.body instanceof FormData)) {
        if (!("Content-Type" in headers)) headers["Content-Type"] = "application/json"
        body = bodyStringify(headers.contentType, sendParams?.body)
    } else {
        body = sendParams?.body
    }

    const request = new Request(urlObject, {
        method,
        headers,
        body
    });

    if (sendParams?.onRequest) sendParams.onRequest(request);
    const response = await fetch(request)

    try {
        if (sendParams?.onResponse) sendParams.onResponse(response)
        const data = await response.json();
        return data as T
    } catch (error) {
        return null
    }
}

function bodyStringify(contentType: string, body: unknown) {
    if (!body) return undefined;

    switch (contentType) {
        case "application/x-www-form-urlencoded": {
            const formData = new FormData();
            if (typeof body == "object") {
                for (const key in body) {
                    formData.append(key, body[key as keyof typeof body])
                }
            }
            return formData;
        }

        default:
            return JSON.stringify(body)
    }
}

function createClient(options?: ClientOptions) {
    function _send<T>(url: string, method: SupportMethods, sendParams?: SendParams) {
        if (options?.prefix) {
            url = combine(options.prefix, url)
        }

        if (options?.onResponse) {
            if (!sendParams) sendParams = {};
            if (!sendParams.onResponse) sendParams.onResponse = options.onResponse
        }

        if (options?.onRequest) {
            if (!sendParams) sendParams = {};
            if (!sendParams.onRequest) sendParams.onRequest = options.onRequest
        }

        return send<T>(url, method, sendParams)
    }

    return {
        get<T>(url: string, searchParams?: SearchParams, sendParams?: Omit<SendParams, "body" | "searchParams">) {
            return _send<T>(url, "GET", { ...sendParams, searchParams })
        },
        post<T>(url: string, body?: unknown, sendParams?: Omit<SendParams, "body">) {
            return _send<T>(url, "POST", { ...sendParams, body })
        },
        put<T>(url: string, body?: unknown, sendParams?: Omit<SendParams, "body">) {
            return _send<T>(url, "PUT", { ...sendParams, body })
        },
        delete<T>(url: string, searchParams?: SearchParams, sendParams?: Omit<SendParams, "body" | "searchParams">) {
            return _send<T>(url, "DELETE", { ...sendParams, searchParams })
        },
        send: _send
    }
}

export const prefix = "/__api__/";
export const tokenName = "access_token";

export const httpClient = createClient({
    prefix,
    onRequest(request) {
        const token = localStorage.getItem(tokenName);
        if (token) {
            request.headers.set("Authorization", `Bearer ${token}`)
        }
    },
    onResponse(response) {
        const bearer = response.headers.get("www-authenticate")
        if (bearer && response.ok) {
            localStorage.setItem(tokenName, bearer)
        }
    }
});