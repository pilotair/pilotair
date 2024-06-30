import { useNavigate } from "@/common/router"

export function useChallenge() {
    const navigate = useNavigate();

    function challenge() {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("@/account/sign");
        }
    }

    return {
        challenge
    }
}