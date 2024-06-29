import { useNavigate } from "@/common/router"

export function useChallenge() {
    const navigate = useNavigate();

    function challenge() {
        navigate("@/account/login");
    }

    return {
        challenge
    }
}