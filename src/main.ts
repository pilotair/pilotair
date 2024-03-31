import { serve } from "bun"
import { createContext, type Context } from "./context"
import { adminMiddleware } from "./admin"
import { apiMiddleware } from "./api"
import { isPromise } from "node:util/types"

const middlewares = [adminMiddleware, apiMiddleware]


async function invoke(context: Context) {
    for (const middleware of middlewares) {
        let result = middleware(context)
        if (isPromise(result)) result = await result
        if (result) return;
    }
}

serve({
    port: 80,
    async fetch(request: Request) {
        const context = createContext(request);
        await invoke(context);
        return context.response || new Response("Not found", {
            status: 404
        });
    }
})
