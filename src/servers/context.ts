import { URL } from "node:url"

export interface Context {
    request: Request;
    response?: Response
    url: URL
}

export function createContext(request: Request): Context {
    const url = new URL(request.url);

    return {
        request,
        url
    }
}