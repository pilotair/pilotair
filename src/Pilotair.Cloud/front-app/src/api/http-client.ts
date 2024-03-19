import createClient from "openapi-fetch";
import type { paths } from "./schema"; // generated by openapi-typescript

export const httpClient = createClient<paths>();