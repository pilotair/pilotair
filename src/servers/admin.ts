import type { Context } from "./context";
import { extname, join } from "node:path"
import { file } from "bun"
import mime from "mime/lite"
import { cwd } from "node:process";

const prefix = "/__admin__"
const fallbackFile = join(cwd(), prefix, "/index.html")


export function adminMiddleware(context: Context): boolean {
    if (!context.url.pathname.startsWith(prefix)) return false;
    let path = context.url.pathname;
    const extension = extname(path);
    if (!extension) {
        path = fallbackFile
    } else {
        path = join(cwd(), path)
    }

    let contentType = mime.getExtension(extension);
    if (!contentType) {
        contentType = "text/html"
    }

    context.response = new Response(file(path), {
        headers: {
            ContentType: contentType
        }
    })
    return true;
}