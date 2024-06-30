import { useNavigate } from "@/common/router"

export function useChallenge() {
    const navigate = useNavigate();

    function challenge() {
        navigate("@/account/sign");
    }

    return {
        challenge
    }
}