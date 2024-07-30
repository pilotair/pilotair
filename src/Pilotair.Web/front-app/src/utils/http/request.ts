import { createDynamicValueIsKeyObject } from "../object";
import { bodyParse, bodyStringify } from "./content";

export type SupportMethods = "GET" | "POST" | "PUT" | "DELETE";
export type SearchParams = Record<string, string | string[] | undefined>;
type SendResponse<T> = Promise<T extends void ? void : T>;

export const httpMethods = createDynamicValueIsKeyObject<SupportMethods>();

export interface Options {
  searchParams?: SearchParams;
  body?: unknown;
  headers?: Record<string, string>;
  onSending?: (request: Request) => Promise<Response> | Response;
}

function parseUrl(url: string, search?: SearchParams) {
  const result = new URL(url, URL.canParse(url) ? undefined : location.origin);
  if (search) {
    for (const key in search) {
      const value = search[key];
      if (!value) continue;
      if (typeof value == "string") {
        result.searchParams.append(key, value);
      } else {
        for (const i of value) {
          result.searchParams.append(key, i);
        }
      }
    }
  }
  return result;
}

export async function send<T>(
  url: string,
  method: SupportMethods,
  options?: Options,
): SendResponse<T> {
  const input = parseUrl(url, options?.searchParams);

  const headers = options?.headers ?? {};
  let body: string | FormData | undefined;

  if (!(options?.body instanceof FormData)) {
    if (!("Content-Type" in headers))
      headers["Content-Type"] = "application/json";
    body = bodyStringify(headers.contentType, options?.body);
  } else {
    body = options?.body;
  }

  const request = new Request(input, {
    method,
    headers,
    body,
  });

  let response: Response | undefined;

  if (options?.onSending) {
    response = await options.onSending(request);
  } else {
    response = await fetch(request);
  }

  return bodyParse(response) as SendResponse<T>;
}
