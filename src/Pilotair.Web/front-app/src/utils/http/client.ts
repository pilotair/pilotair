import { combine } from "@/utils/path";
import { httpMethods, Options, SearchParams, send } from "./request";

interface ClientOptions extends Omit<Options, "body" | "searchParams"> {
  prefix?: string;
}

type SendOptions = Omit<Options, "body" | "searchParams">;

export class HttpClient {
  constructor(readonly options?: ClientOptions) {}

  private combineUrl(url: string) {
    if (this.options?.prefix) {
      return combine(this.options?.prefix, url);
    }
    return url;
  }

  private mergeOptions(options?: SendOptions) {
    return {
      headers: { ...this.options?.headers, ...options?.headers },
      onSending: options?.onSending || this.options?.onSending,
      successMessage: options?.successMessage ?? this.options?.successMessage,
      errorMessage: options?.errorMessage ?? this.options?.errorMessage,
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
