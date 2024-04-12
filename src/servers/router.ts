import { FileSystemRouter, type MatchedRoute, file as _file } from "bun"
import { exists } from "node:fs/promises"
import { join } from "node:path"
import { buildPath, srcPath } from "@/utils/path"

interface RouterOptions {
    sourcePath: string;
    buildPrefix: string;
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
            join(srcPath, "servers", "hydrate.tsx"),
            ...Object.values(sourceRouter.routes),
        ],
        outdir: join(buildPath, options.assetPrefix),
        target: 'browser',
        splitting: true,
    });

    let assetPrefix = options.assetPrefix;
    if (!options.assetPrefix.endsWith('/')) {
        assetPrefix += '/'
    }

    const buildRouter = new Bun.FileSystemRouter({
        dir: join(buildPath, options.assetPrefix),
        style: 'nextjs',
        origin: options?.origin,
        assetPrefix: assetPrefix
    });

    function checkPrefix(path: string) {
        return path === `/${options.assetPrefix}` || path.startsWith(`/${options.assetPrefix}/`)
    }

    function match(path: string): RouteResult | undefined {
        if (!checkPrefix(path)) return;
        path = getRelativePath(path, options.assetPrefix);
        const sourceRoute = sourceRouter.match(path);
        if (!sourceRoute) return;
        const buildRoute = buildRouter.match(join(options.buildPrefix, path));
        if (!buildRoute) return;
        return { sourceRoute, buildRoute };
    }

    async function file(path: string) {
        if (!checkPrefix(path)) return;
        path = join(buildPath, path);

        if (await exists(path)) {
            return _file(path)
        }
    }

    return { match, file }
}

function getRelativePath(path: string, assetPrefix: string) {
    if (path.length == assetPrefix.length + 1) return "/";
    return path.substring(assetPrefix.length + 1);
}
