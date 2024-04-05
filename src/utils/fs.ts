import { rm, exists } from "node:fs/promises"

export async function removeDir(path: string) {
    if (!exists(path)) return
    await rm(path, {
        recursive: true
    })
}

