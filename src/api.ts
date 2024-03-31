import type { Context } from "./context";
import { extname, join } from "node:path"
import { file, FileSystemRouter } from "bun"
import { basePath } from "./utils/path"

const prefix = "/__api__"

const router = new FileSystemRouter({
    style: "nextjs",
    dir: join(basePath, "./routes"),
});

export async function apiMiddleware(context: Context): Promise<boolean> {
    if (!context.url.pathname.startsWith(prefix)) return false;
    const path = context.url.pathname.substring(prefix.length)
    const route = router.match(path);
    if (!route) return false;
    const module = await import(route.filePath);
    const action = module[context.request.method]();

    context.response = new Response(JSON.stringify(action), {
        headers: {
            ContentType: "application/json"
        }
    })
    
    return true;
}