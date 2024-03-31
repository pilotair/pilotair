import type { Context } from "./context";

export const ADMIN_PATH = "__admin__"

function adminMiddleware(context: Context): boolean {
    if (!context.url.pathname.startsWith(ADMIN_PATH)) return false;

    

    return true;
}