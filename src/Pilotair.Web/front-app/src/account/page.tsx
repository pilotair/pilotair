import BlankLayout from "@/common/layout/blank-layout";
import { Redirect, Route, Switch } from "wouter";
import PasswordSign from "./password-sign";

export default function Account() {
  return (
    <BlankLayout>
      <Switch>
        <Route path="/sign" component={PasswordSign} />
        <Redirect to="/sign" />
      </Switch>
    </BlankLayout>
  );
}
