type SearchParams = Record<string, string | string[]>;

interface SendParams {
    searchParams?: SearchParams
    body?: unknown,
    headers?: Record<string, string>
}
type SupportMethods = "GET" | "POST" | "PUT" | "DELETE";

async function send<T>(url: string, method: SupportMethods, sendParams?: SendParams) {
    const urlObject = new URL(url, URL.canParse(url) ? undefined : location.origin)

    if (sendParams?.searchParams) {
        for (const key in sendParams.searchParams) {
            const value = sendParams.searchParams[key];
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
        if (!("contentType" in headers)) headers.contentType = "application/json"
        body = bodyStringify(headers.contentType, sendParams?.body)
    } else {
        body = sendParams?.body
    }

    const response = await fetch(urlObject, {
        method,
        headers,
        body,
    })

    try {
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

function createClient() {
    return {
        get<T>(url: string, searchParams?: SearchParams, sendParams?: Omit<SendParams, "body" | "searchParams">) {
            return send<T>(url, "GET", { ...sendParams, searchParams })
        },
        post<T>(url: string, body?: unknown, sendParams?: Omit<SendParams, "body">) {
            return send<T>(url, "POST", { ...sendParams, body })
        },
        put<T>(url: string, body?: unknown, sendParams?: Omit<SendParams, "body">) {
            return send<T>(url, "PUT", { ...sendParams, body })
        },
        delete<T>(url: string, searchParams?: SearchParams, sendParams?: Omit<SendParams, "body" | "searchParams">) {
            return send<T>(url, "DELETE", { ...sendParams, searchParams })
        },
        send
    }
}

export const httpClient = createClient();