export function combine(...path: string[]) {
    return path.filter(f => f).join('/')
}

export function removeFragment(path: string, start: number) {
    const fragments = path.split('/');
    
    for (let i = 0; i < start; i++) {
        fragments.shift();
    }

    return fragments.join('/')
}