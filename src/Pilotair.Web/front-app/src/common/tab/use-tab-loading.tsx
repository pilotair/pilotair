import { useCallback, useRef, useState } from "react"

export function useTabLoading() {
    const loadingStack = useRef(0)
    const [isLoading, setIsLoading] = useState(false)

    const showLoading = useCallback((show: boolean = true) => {
        if (show) {
            loadingStack.current++;
            setIsLoading(true)
        } else {
            loadingStack.current--;
            if (loadingStack.current < 0) loadingStack.current = 0;
            if (loadingStack.current == 0) setIsLoading(false)
        }
    }, [])

    const loading = useCallback(async (action: () => Promise<void>) => {
        showLoading(true);
        try {
            await action()
        } finally {
            showLoading(false);
        }
    }, [showLoading])

    return {
        isLoading,
        loading,
        showLoading
    }
}