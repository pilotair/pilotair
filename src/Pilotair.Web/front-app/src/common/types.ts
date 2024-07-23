import { System } from "@/schema";
import { ReactNode } from "react";

export type KeyValue = System.Collections.Generic.KeyValuePairStringString;

export interface ChildrenProps {
    children: ReactNode
}