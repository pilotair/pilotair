import { ReactNode, useState, createContext, Dispatch, SetStateAction } from "react";

interface WorkspaceContextValue {
    active: string,
    setActive: Dispatch<SetStateAction<string>>
}

export const WorkspaceContext = createContext({} as WorkspaceContextValue);

interface Props {
    children: ReactNode
}

export function WorkspaceStateProvider({ children }: Props) {
    const [active, setActive] = useState("home");

    return (
        <WorkspaceContext.Provider value={{ active, setActive }}>
            {children}
        </WorkspaceContext.Provider>
    );
}