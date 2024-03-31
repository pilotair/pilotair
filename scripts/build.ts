import { $, build } from "bun";

await build({
    entrypoints: ["src/main.ts"],
    target: "bun",
    outdir: "dist"
})

await $`bun run --cwd front-app build`