import { message } from "antd";
import { createContext } from "react";
import { ChildrenProps } from "./types";

type MessageInstance = ReturnType<typeof message.useMessage>[0];

export const MessageContext = createContext<MessageInstance>(
  {} as MessageInstance,
);

export function MessageProvider({ children }: ChildrenProps) {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
}
