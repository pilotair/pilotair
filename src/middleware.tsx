import type { Context } from "./servers/context";
import { extname, join } from "node:path"
import { srcPath } from "@/utils/path"
import mime from "mime/lite"
import { renderToReadableStream } from "react-dom/server";
import { createRouter } from "@/servers/router";

const router = await createRouter({
    sourcePath: join(srcPath, "routes"),
    buildPrefix: "/routes",
    origin: "http://localhost:8080",
    assetPrefix: "_admin",
})

export async function adminMiddleware(context: Context): Promise<boolean> {
    const match = router.match(context.url.pathname);
    if (match) {
        const module = await import(match.sourceRoute.filePath);
        const stream = await renderToReadableStream(<module.default />, {
            bootstrapScriptContent: `globalThis.PATH_TO_PAGE = "${match.buildRoute.src}";`,
            bootstrapModules: ['/_admin/servers/hydrate.js'],
        });

        context.response = new Response(stream, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });

        return true;
    }

    const file = await router.file(context.url.pathname);

    if (file) {
        context.response = new Response(file, {
            headers: { 'Content-Type': 'application/javascript' },
        });

        return true;
    }

    return false;
}
