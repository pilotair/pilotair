import { cwd, env } from "node:process";
import { join } from "node:path"

export const basePath = join(cwd(), env.PILOTAIR_CWD)

console.log(`base path: ${basePath}`)

