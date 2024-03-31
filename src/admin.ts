import type { Context } from "./context";
import { extname, join } from "node:path"
import { file } from "bun"
import mime from "mime/lite"
import { adminPath } from "./utils/path";

const fallbackFile = join(adminPath, "/index.html")
const prefix = "/__admin__"

export function adminMiddleware(context: Context): boolean {
    if (!context.url.pathname.startsWith(prefix)) return false;
    let path = context.url.pathname.substring(prefix.length)
    const extension = extname(path);
    if (!extension) {
        path = fallbackFile
    } else {
        path = join(adminPath, path)
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