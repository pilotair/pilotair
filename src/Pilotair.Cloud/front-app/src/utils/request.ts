export function send(url: string, qs: Record<string, object>) {
    const urlObject = new URL(url);
    const urlSearchParams = urlObject.searchParams

    for (const key in qs) {
        if (urlSearchParams.has(key)) continue;
        urlSearchParams.set(key, qs[key]?.toString())
    }

    fetch(`/__admin__/${url}`, {

    })
}