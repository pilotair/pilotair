
async function send<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body: unknown = undefined) {
    const response = await fetch(url, {
        method: method,
        headers: {
            contentType: "application/json"
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
        get<T>(url: string) {
            return send<T>(url, "GET")
        },
        post<T>(url: string, body?: unknown) {
            return send<T>(url, "POST", body)
        },
        put<T>(url: string, body?: unknown) {
            return send<T>(url, "PUT", body)
        },
        delete<T>(url: string,) {
            return send<T>(url, "DELETE")
        },
    }
}


export const httpClient = createClient();