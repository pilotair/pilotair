import { env, type Env } from "bun"
import { getFullPath } from "./utils/path"

declare module "bun" {
    interface Env {
        PILOTAIR_DATA: string;
        PILOTAIR_CWD: string
    }
}

const defaultValue: Env = {
    PILOTAIR_CWD: getFullPath("src"),
    PILOTAIR_DATA: getFullPath("/data")
}

export default { ...defaultValue, ...env }