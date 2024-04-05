import { FileSystemRouter, type MatchedRoute, file as _file } from "bun"
import { exists } from "node:fs/promises"
import { join } from "node:path"
import { adminPath } from "@/utils/path"

interface RouterOptions {
    sourcePath: string;
    buildPath: string;
    assetPrefix: string
    origin?: string,
}

interface RouteResult {
    sourceRoute: MatchedRoute,
    buildRoute: MatchedRoute,
}

export async function createRouter(options: RouterOptions) {

    const sourceRouter = new FileSystemRouter({
        dir: options.sourcePath,
        style: 'nextjs',
    });

    await Bun.build({
        entrypoints: [
            join(adminPath, "hydrate.tsx"),
            ...Object.values(sourceRouter.routes),
        ],
        outdir: options.buildPath,
        target: 'browser',
        splitting: true,
    });

    const buildRouter = new Bun.FileSystemRouter({
        dir: options.buildPath,
        style: 'nextjs',
        origin: options?.origin,
        assetPrefix: options.assetPrefix + '/'
    });

    function checkPrefix(path: string) {
        return path === `/${options.assetPrefix}` || path.startsWith(`/${options.assetPrefix}/`)
    }

    function match(path: string): RouteResult | undefined {
        if (!checkPrefix(path)) return;
        path = path.substring(options.assetPrefix.length + 1)
        const sourceRoute = sourceRouter.match(path);
        if (!sourceRoute) return;
        const buildRoute = buildRouter.match(path);
        if (!buildRoute) return;
        return { sourceRoute, buildRoute };
    }

    async function file(path: string) {
        if (!checkPrefix(path)) return;
        path = path.substring(options.assetPrefix.length + 1)
        path = join(options.buildPath, path);

        if (await exists(path)) {
            return _file(path)
        }
    }

    return { match, file }
}
