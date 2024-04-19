export function combine(...path: string[]) {
    return path.filter(f => f).join('/')
}