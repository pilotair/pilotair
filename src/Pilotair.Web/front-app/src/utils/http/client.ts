import { combine } from "@/utils/path";
import { httpMethods, Options, SearchParams, send } from "./request";

interface ClientOptions extends Omit<Options, "body" | "searchParams"> {
  prefix?: string;
}

export type SendOptions = Omit<Options, "body" | "searchParams">;

export class HttpClient {
  constructor(readonly options?: ClientOptions) {}

  private combineUrl(url: string) {
    if (this.options?.prefix) {
      return combine(this.options?.prefix, url);
    }
    return url;
  }

  private mergeOptions(options?: SendOptions): SendOptions {
    return {
      headers: { ...this.options?.headers, ...options?.headers },
      onRequest: (request: Request) => {
        if (this.options?.onRequest) request = this.options.onRequest(request);
        if (options?.onRequest) request = options.onRequest(request);
        return request;
      },
      onResponse: (response: Response) => {
        if (this.options?.onResponse)
          response = this.options.onResponse(response);
        if (options?.onResponse) response = options.onResponse(response);
        return response;
      },
    };
  }

  get<T>(url: string, searchParams?: SearchParams, options?: SendOptions) {
    return send<T>(this.combineUrl(url), httpMethods.GET, {
      searchParams,
      ...this.mergeOptions(options),
    });
  }

  post<T>(
    url: string,
    body?: unknown,
    searchParams?: SearchParams,
    options?: SendOptions,
  ) {
    return send<T>(this.combineUrl(url), httpMethods.POST, {
      body,
      searchParams,
      ...this.mergeOptions(options),
    });
  }

  put<T>(
    url: string,
    body?: unknown,
    searchParams?: SearchParams,
    options?: SendOptions,
  ) {
    return send<T>(this.combineUrl(url), httpMethods.PUT, {
      body,
      searchParams,
      ...this.mergeOptions(options),
    });
  }
  delete<T>(url: string, searchParams?: SearchParams, options?: SendOptions) {
    return send<T>(this.combineUrl(url), httpMethods.DELETE, {
      searchParams,
      ...this.mergeOptions(options),
    });
  }
}
