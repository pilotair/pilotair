import { serve } from "bun"
import { createContext, type Context } from "./context"
import { adminMiddleware } from "../admin/middleware"
// import { apiMiddleware } from "./api"
import { isPromise } from "node:util/types"
const middlewares = [ adminMiddleware]

async function invoke(context: Context) {
    for (const middleware of middlewares) {
        let result = middleware(context)
        if (isPromise(result)) {
            if (await result) return
        }
    }
}

export function createServer() {
    return serve({
        port: 8080,
        async fetch(request: Request) {
            const context = createContext(request);
            await invoke(context);
            return context.response || new Response("Not found", {
                status: 404
            });
        },
    })
}
