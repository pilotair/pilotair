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

    return (e: T) => {
        const old = eventSource.current ? JSON.parse(JSON.stringify(eventSource.current)) : undefined
        setEventSource({ old, current: e, count: eventSource.count + 1 })
    }
}