import * as icons from "@ant-design/icons"

interface Props {
    name: string
}

export function Icon({ name }: Props) {
    const Component = icons[name as keyof typeof icons] as unknown as () => JSX.Element;
    return <Component />
}