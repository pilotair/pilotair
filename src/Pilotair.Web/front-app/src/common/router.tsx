import { combine } from "@/utils/path";
import { useLocation } from "wouter";

export const base = "/__admin__";

export function useNavigate() {
    const [, setLocation] = useLocation();

    function navigate(location: string) {
        if (location.startsWith('@/')) {
            location = combine('~', base, location.substring(2))
        }
        setLocation(location)
    }
    return navigate
}