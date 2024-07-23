import { ConfigProvider } from 'antd'
import { Redirect, Route, Router, Switch } from "wouter"
import Account from './account/page.tsx'
import Workspace from "./workspace/page.tsx"
import { base } from "@/common/router.tsx"
import { useChallenge } from '@/account/use-challenge.ts'
import { shortcuts, useShortcut } from './utils/shortcuts.ts'
import { useEvent } from './common/events/event.tsx'
import { save } from './common/events/sources.tsx'
import { LoadingProvider } from './common/loading-context.tsx'
import GlobalModal from './common/global-context.tsx'

export default function App() {
    const { challenge } = useChallenge();
    const emitSave = useEvent(save)
    useShortcut(shortcuts.save, emitSave)

    challenge();

    return (
        <ConfigProvider theme={{ cssVar: true }}>
            <GlobalModal>
                <LoadingProvider>
                    <Router base={base}>
                        <Switch>
                            <Route path="/" component={Workspace} />
                            <Route path="/account" component={Account} nest />
                            <Redirect to='/' />
                        </Switch>
                    </Router>
                </LoadingProvider>
            </GlobalModal>
        </ConfigProvider>
    )
}