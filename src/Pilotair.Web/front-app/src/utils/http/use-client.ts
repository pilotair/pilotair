import { useCallback, useContext } from "react";
import { HttpClient, SendOptions } from "./client";
import { LoadingContext } from "@/common/loading-context";
import { ModalContext } from "@/common/modals/context";
import { SearchParams } from "./request";
import { MessageContext } from "@/common/message";

export const prefix = "/__api__/";
export const tokenName = "access_token";

const httpClient = new HttpClient({
  prefix,
  onRequest(request) {
    const token = localStorage.getItem(tokenName);
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
  onResponse(response) {
    const bearer = response.headers.get("www-authenticate");
    if (bearer && response.ok) {
      localStorage.setItem(tokenName, bearer);
    }
    return response;
  },
});

type Options = SendOptions & {
  successMessage?: false | string;
  errorMessage?: false | string;
};

export function useHttpClient() {
  const { setLoading } = useContext(LoadingContext);
  const { confirm } = useContext(ModalContext);
  const { success: showSuccess, error: showError } = useContext(MessageContext);

  const httpGet = useCallback(
    async function httpGet<T>(
      url: string,
      searchParams?: SearchParams,
      options?: Options,
    ) {
      try {
        setLoading(true);
        const result = await httpClient.get<T>(url, searchParams, options);
        return result;
      } catch (error) {
        showError(error as string);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [showError, setLoading],
  );

  const httpPost = useCallback(
    async function httpPost<T>(
      url: string,
      body?: unknown,
      searchParams?: SearchParams,
      options?: Options,
    ) {
      try {
        setLoading(true);
        const result = await httpClient.post<T>(
          url,
          body,
          searchParams,
          options,
        );
        if (options?.successMessage !== false) {
          showSuccess(options?.successMessage || "Save success");
        }

        return result;
      } catch (error) {
        showError(error as string);
      } finally {
        setLoading(false);
      }
    },
    [showSuccess, showError, setLoading],
  );

  const httpPut = useCallback(
    async function httpPut<T>(
      url: string,
      body?: unknown,
      searchParams?: SearchParams,
      options?: Options,
    ) {
      try {
        setLoading(true);
        const result = await httpClient.put<T>(
          url,
          body,
          searchParams,
          options,
        );
        if (options?.successMessage !== false) {
          showSuccess(options?.successMessage || "Update success");
        }
        return result;
      } catch (error) {
        showError(error as string);
      } finally {
        setLoading(false);
      }
    },
    [showSuccess, showError, setLoading],
  );

  const httpDelete = useCallback(
    async function httpDelete<T>(
      url: string,
      searchParams?: SearchParams,
      options?: Options,
    ) {
      const ok = await confirm({
        title: "Are you sure delete?",
      });
      if (!ok) throw new Error("Cancel delete");
      try {
        setLoading(true);
        const result = await httpClient.delete<T>(url, searchParams, options);
        if (options?.successMessage !== false) {
          showSuccess(options?.successMessage || "Delete success");
        }
        return result;
      } catch (error) {
        showError(error as string);
      } finally {
        setLoading(false);
      }
    },
    [confirm, setLoading, showSuccess, showError],
  );

  return { httpGet, httpPost, httpPut, httpDelete };
}
