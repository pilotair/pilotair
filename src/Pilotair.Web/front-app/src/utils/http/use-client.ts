import { useContext, useMemo } from "react";
import { HttpClient } from "./client";
import { LoadingContext } from "@/common/loading-context";
import { ModalContext } from "@/common/modals/context";
import { httpMethods } from "./request";
import { MessageContext } from "@/common/message";

export const prefix = "/__api__/";
export const tokenName = "access_token";

const successMessages = {
  [httpMethods.POST]: "Save success",
  [httpMethods.PUT]: "Update success",
  [httpMethods.DELETE]: "Delete success",
};

export function useHttpClient() {
  const { onLoading } = useContext(LoadingContext);
  const { confirm } = useContext(ModalContext);
  const { success, error } = useContext(MessageContext);

  const httpClient = useMemo(
    () =>
      new HttpClient({
        prefix,
        async onSending(request, option) {
          if (request.method == httpMethods.DELETE) {
            const ok = await confirm({
              title: "Are you sure delete?",
            });
            if (!ok) throw new Error("Cancel delete");
          }
          const token = localStorage.getItem(tokenName);
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }

          const response = (await onLoading(fetch(request))) as Response;
          const bearer = response.headers.get("www-authenticate");
          if (bearer && response.ok) {
            localStorage.setItem(tokenName, bearer);
          }

          if (!response.ok && option.errorMessage !== false) {
            error?.(option.errorMessage || (await response.json()));
          }

          if (
            response.ok &&
            option.successMessage !== false &&
            request.method != httpMethods.GET
          ) {
            success?.(option.successMessage || successMessages[request.method]);
          }

          return response;
        },
      }),
    [onLoading, confirm, success, error],
  );

  return { httpClient };
}
