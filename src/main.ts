import { serve } from "bun"

serve({
    port: 80,
    fetch() {
        return new Response("Hello world")
    }
})