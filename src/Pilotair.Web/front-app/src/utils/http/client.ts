import { bodyParse, bodyStringify } from "./content";
import { combine } from "@/utils/path";

type SupportMethods = "GET" | "POST" | "PUT" | "DELETE";
type SearchParams = Record<string, string | string[] | undefined>;
type SendResponse<T> = Promise<T extends void ? void : T>;

interface CommonParams {
  onResponse?: (
    response: Response,
    request: Request,
    sendParams: SendParams,
  ) => Promise<Response> | Response;
  onRequest?: (request: Request) => Promise<Request> | Request;
  onSend?: (action: Promise<Response>) => Promise<Response>;
  postSuccessMessage?: string | false;
  putSuccessMessage?: string | false;
  deleteSuccessMessage?: string | false;
}

export interface SendParams extends CommonParams {
  searchParams?: SearchParams;
  body?: unknown;
  headers?: Record<string, string>;
}

async function send<T>(
  url: string,
  method: SupportMethods,
  sendParams?: SendParams,
): SendResponse<T> {
  const urlObject = new URL(
    url,
    URL.canParse(url) ? undefined : location.origin,
  );

  if (sendParams?.searchParams) {
    for (const key in sendParams.searchParams) {
      const value = sendParams.searchParams[key];
      if (!value) continue;
      if (typeof value == "string") {
        urlObject.searchParams.append(key, value);
      } else {
        for (const i of value) {
          urlObject.searchParams.append(key, i);
        }
      }
    }
  }

  const headers = sendParams?.headers ?? {};
  let body: string | FormData | undefined;

  if (!(sendParams?.body instanceof FormData)) {
    if (!("Content-Type" in headers))
      headers["Content-Type"] = "application/json";
    body = bodyStringify(headers.contentType, sendParams?.body);
  } else {
    body = sendParams?.body;
  }

  let request = new Request(urlObject, {
    method,
    headers,
    body,
  });

  if (sendParams?.onRequest) {
    request = await sendParams.onRequest(request);
  }
  let response: Response | undefined;
  if (sendParams?.onSend) {
    response = await sendParams.onSend(fetch(request));
  } else {
    response = await fetch(request);
  }

  if (sendParams?.onResponse) {
    response = await sendParams.onResponse(response, request, sendParams);
  }

  return bodyParse(response) as SendResponse<T>;
}

interface ClientOptions extends CommonParams {
  prefix?: string;
}

export function createClient(options?: ClientOptions) {
  function _send<T>(
    url: string,
    method: SupportMethods,
    sendParams?: SendParams,
  ) {
    if (options?.prefix) {
      url = combine(options.prefix, url);
    }

    if (options?.onRequest) {
      if (!sendParams) sendParams = {};
      if (!sendParams.onRequest) sendParams.onRequest = options.onRequest;
    }

    if (options?.onResponse) {
      if (!sendParams) sendParams = {};
      if (!sendParams.onResponse) sendParams.onResponse = options.onResponse;
    }

    if (options?.onSend) {
      if (!sendParams) sendParams = {};
      if (!sendParams.onSend) sendParams.onSend = options.onSend;
    }

    return send<T>(url, method, sendParams);
  }

  return {
    get<T>(
      url: string,
      searchParams?: SearchParams,
      sendParams?: Omit<SendParams, "body" | "searchParams">,
    ) {
      return _send<T>(url, "GET", { ...sendParams, searchParams });
    },
    post<T>(
      url: string,
      body?: unknown,
      sendParams?: Omit<SendParams, "body">,
    ) {
      return _send<T>(url, "POST", { ...sendParams, body });
    },
    put<T>(url: string, body?: unknown, sendParams?: Omit<SendParams, "body">) {
      return _send<T>(url, "PUT", { ...sendParams, body });
    },
    delete<T>(
      url: string,
      searchParams?: SearchParams,
      sendParams?: Omit<SendParams, "body" | "searchParams">,
    ) {
      return _send<T>(url, "DELETE", { ...sendParams, searchParams });
    },
    send: _send,
  };
}
