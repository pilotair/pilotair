import { cwd } from "node:process";
import { join, isAbsolute } from "node:path"

export function getFullPath(...path: string[]) {
    return join(cwd(), ...path)
}
