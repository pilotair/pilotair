import BlankLayout from "@/common/layout/blank-layout";
import { Route, Switch } from "wouter";
import Login from "./login";

export default function Account() {
    return (
        <BlankLayout>
            <Switch>
                <Route path="/login" component={Login} />
            </Switch>
        </BlankLayout>
    )
}