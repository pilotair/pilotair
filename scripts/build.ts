import { $ } from "bun";
import { cp, rm } from "node:fs/promises"

rm("dist", { recursive: true })
await $`bun run --cwd front-app build`
await cp("src", "dist", { recursive: true })
await cp(".env.production", "dist/.env")

