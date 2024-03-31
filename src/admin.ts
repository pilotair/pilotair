import type { Context } from "./context";
import { extname, join } from "node:path"
import { file } from "bun"
import mime from "mime/lite"
import { adminPath } from "./utils/path";

const fallbackFile = join(adminPath, "/index.html")

export function adminMiddleware(context: Context): boolean {
    if (!context.url.pathname.startsWith(adminPath)) return false;
    let path = context.url.pathname;
    if (path == '/') {
        path = fallbackFile
    }

    const extension = extname(context.url.pathname);
    if (!extension) {
        path = fallbackFile
    }

    let contentType = mime.getExtension(extension);
    if (!contentType) {
        contentType = "text/html"
    }

    path = join(adminPath, path)
    context.response = new Response(file(path), {
        headers: {
            ContentType: contentType
        }
    })
    return true;
}