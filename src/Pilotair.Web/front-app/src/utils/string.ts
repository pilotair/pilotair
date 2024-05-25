export function trimStart(value: string, char: string) {
    if (!value) return value;
    while (value.startsWith(char)) {
        value = value.substring(char.length);
    }
    return value;
}

export function trimEnd(value: string, char: string) {
    if (!value) return value;
    while (value.endsWith(char)) {
        value = value.substring(0, value.length - char.length);
    }
    return value;
}