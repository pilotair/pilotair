import { cwd } from "node:process";
import { join } from "node:path"

const rootPath = cwd();
export const buildPath = join(rootPath, ".pilotair")
export const dataPath = join(rootPath, "data")
export const srcPath = join(rootPath, "src")
export const adminPath = join(srcPath, "admin")
export const systemPath = join(srcPath, "system")
export function getFullPath(...path: string[]) {
    return join(rootPath, ...path)
}
