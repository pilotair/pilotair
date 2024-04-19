


async function send<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: unknown, header: Record<string, string> = {}) {
    const response = await fetch(url, {
        method: method,
        headers: {
            contentType: "application/json",
            ...header
        },
        body: body ? JSON.stringify(body) : undefined
    })

    try {
        const data = await response.json();
        return data as T
    } catch (error) {
        return null
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