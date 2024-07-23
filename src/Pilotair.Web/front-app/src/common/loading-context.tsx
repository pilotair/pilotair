import { createContext, useCallback, useRef, useState } from "react";
import { ChildrenProps } from "./types";
import Loading from "./basic/loading";

interface Props {
    setLoading: (loading: boolean) => void;
    onLoading: (action: Promise<unknown>) => Promise<unknown>;
}

export const LoadingContext = createContext<Props>({} as Props);

export function LoadingProvider({ children }: ChildrenProps) {
    const [loading, setLoading] = useState(false);
    const actions = useRef<Promise<unknown>[]>([]);

    const onLoading = useCallback(async (action: Promise<unknown>) => {
        setLoading(true)
        actions.current.push(action);
        try {
            return await action
        } finally {
            const index = actions.current.indexOf(action);
            if (index > -1) actions.current.splice(index, 1);
            if (!actions.current.length) setLoading(false)
        }
    }, [])

    return (
        <LoadingContext.Provider value={{ setLoading, onLoading }}>
            {children}
            <Loading show={loading} className="absolute inset-0" />
        </LoadingContext.Provider>
    )
}