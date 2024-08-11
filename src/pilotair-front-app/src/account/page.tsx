import BlankLayout from "@/common/layout/blank-layout";
import { Redirect, Route, Switch } from "wouter";
import PasswordSignIn from "./password-sign-in";

export default function Account() {
  return (
    <BlankLayout>
      <Switch>
        <Route path="/sign" component={PasswordSignIn} />
        <Redirect to="/sign" />
      </Switch>
    </BlankLayout>
  );
}
