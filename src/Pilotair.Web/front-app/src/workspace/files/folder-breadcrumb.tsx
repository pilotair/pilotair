import { Breadcrumb, BreadcrumbProps } from "antd"
import { useMemo } from "react"
import { HomeTwoTone } from "@ant-design/icons"

interface Props {
    path: string,
    className?: string,
    setFolder: (path: string) => void
}

export default function FolderBreadcrumb({ path, className, setFolder }: Props) {
    const Items = useMemo(() => {
        const items: BreadcrumbProps["items"] = [];
        const fragments = path.split('/').filter(f => f)
        const length = fragments.length;

        while (fragments.length) {
            const title = fragments[fragments.length - 1];

            if (fragments.length == length) {
                items.unshift({ title: title })
            } else {
                const path = fragments.join('/')
                items.unshift({
                    title: <a>{title}</a>,
                    onClick() {
                        setFolder(path)
                    }
                })
            }

            fragments.splice(fragments.length - 1, 1)
        }

        items.unshift({
            title: <a><HomeTwoTone /></a>,
            onClick() {
                setFolder('')
            }
        })

        return items;
    }, [path])

    return <Breadcrumb className={"w-full" + className} items={Items} />
}