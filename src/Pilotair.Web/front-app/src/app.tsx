import { ConfigProvider } from 'antd'
import GlobalContext from "./common/global-context"
import { Redirect, Route, Router, Switch } from "wouter"
import Account from './account/page.tsx'
import Workspace from "./workspace/page.tsx"
import { base } from "@/common/router.tsx"
import { useChallenge } from '@/account/use-challenge.ts'
import { shortcuts, useShortcut } from './utils/shortcuts.ts'
import { useEvent } from './common/events/event.tsx'
import { save } from './common/events/sources.tsx'

export default function App() {
    const { challenge } = useChallenge();
    const emitSave = useEvent(save)
    useShortcut(shortcuts.save, emitSave)

    challenge();

    return (
        <ConfigProvider theme={{ cssVar: true }}>
            <GlobalContext>
                <Router base={base}>
                    <Switch>
                        <Route path="/" component={Workspace} />
                        <Route path="/account" component={Account} nest />
                        <Redirect to='/' />
                    </Switch>
                </Router>
            </GlobalContext>
        </ConfigProvider>
    )
}