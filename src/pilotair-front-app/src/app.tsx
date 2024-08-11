import { ConfigProvider } from "antd";
import { Redirect, Route, Router, Switch } from "wouter";
import Account from "./account/page";
import Workspace from "./workspace/page";
import { base } from "@/common/router";
import { useChallenge } from "@/account/use-challenge";
import { shortcuts, useShortcut } from "./utils/shortcuts";
import { useEvent } from "./common/events/event";
import { save } from "./common/events/sources";
import { LoadingProvider } from "./common/loading-context";
import { ModalProvider } from "@/common/modals/context";
import { MessageProvider } from "./common/message";
import { ChildrenProps } from "./common/types";

export default function App() {
  const { challenge } = useChallenge();
  const emitSave = useEvent(save);
  useShortcut(shortcuts.save, emitSave);

  challenge();

  return (
    <GlobalProvider>
      <Router base={base}>
        <Switch>
          <Route path="/" component={Workspace} />
          <Route path="/account" component={Account} nest />
          <Redirect to="/" />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

function GlobalProvider({ children }: ChildrenProps) {
  return (
    <ConfigProvider theme={{ cssVar: true }}>
      <ModalProvider>
        <LoadingProvider>
          <MessageProvider>{children}</MessageProvider>
        </LoadingProvider>
      </ModalProvider>
    </ConfigProvider>
  );
}
