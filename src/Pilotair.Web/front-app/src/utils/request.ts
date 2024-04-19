async function send<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: unknown, headers: Record<string, string> = {}) {
    if (!("contentType" in headers)) {
        headers.contentType = "application/json"
    }

    const response = await fetch(url, {
        method: method,
        headers,
        body: bodyStringify(headers.contentType, body)
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
        get<T>(url: string, header?: Record<string, string>) {
            return send<T>(url, "GET", header)
        },
        post<T>(url: string, body?: unknown, header?: Record<string, string>) {
            return send<T>(url, "POST", body, header)
        },
        put<T>(url: string, body?: unknown, header?: Record<string, string>) {
            return send<T>(url, "PUT", body, header)
        },
        delete<T>(url: string, header?: Record<string, string>) {
            return send<T>(url, "DELETE", header)
        },
    }
}

export const httpClient = createClient();