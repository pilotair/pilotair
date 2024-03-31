import { serve } from "bun"
import { createContext } from "./context"

serve({
    port: 80,
    fetch(request: Request) {
        const context = createContext(request);
        return context.response || new Response("Not found", {
            status: 404
        });
    }
})