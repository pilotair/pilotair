import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

interface Event<T> {
    old: T
    current: T,
    count: number
}

type EventSource<T> = ReturnType<typeof atom<Event<T>>>

export function createEventSource<T>(): EventSource<T> {
    return atom<Event<T>>({ count: 0 } as Event<T>);
}

export function useEvent<T>(source: EventSource<T>, listener?: (e: T) => void) {
    const [eventSource, setEventSource] = useAtom(source);
    const count = useRef(eventSource.count);

    useEffect(() => {
        if (count.current == eventSource.count) return
        listener?.(eventSource.current);
    }, [eventSource])

    function emit(e?: T) {
        setEventSource(es => {
            const old = es.current ? JSON.parse(JSON.stringify(es.current)) : undefined;
            return { old, current: e as unknown as T, count: es.count + 1 }
        })
    }

    return emit;
}