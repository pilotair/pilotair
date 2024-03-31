import { cwd, env } from "node:process";
import { join } from "node:path"

export const basePath = join(cwd(), env.PILOTAIR_CWD)
export const adminPath = join(cwd(), env.PILOTAIR_ADMIN)

console.log(`base path: ${basePath}`)
console.log(`admin path: ${adminPath}`)

