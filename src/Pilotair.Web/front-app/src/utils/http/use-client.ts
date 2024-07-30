import { useContext, useMemo } from "react";
import { HttpClient } from "./client";
import { message } from "antd";
import { LoadingContext } from "@/common/loading-context";
import { ModalContext } from "@/common/modals/context";

export const prefix = "/__api__/";
export const tokenName = "access_token";

export function useHttpClient() {
  const { onLoading } = useContext(LoadingContext);
  const { confirm } = useContext(ModalContext);

  const httpClient = useMemo(
    () =>
      new HttpClient({
        prefix,
        async onSending(request) {
          if (request.method == "DELETE") {
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

          if (!response.ok) {
            const error = await response.json();
            message.error(error);
          } else if (request.method == "POST") {
            message.success("Save success");
          } else if (request.method == "PUT") {
            message.success("Update success");
          } else if (request.method == "DELETE") {
            message.success("Delete success");
          }

          return response;
        },
      }),
    [onLoading, confirm],
  );

  return { httpClient };
}
