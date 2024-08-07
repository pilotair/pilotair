import { useNavigate } from "@/common/router";
import { tokenName } from "@/utils/http/use-client";
import { jwtDecode } from "jwt-decode";

export function useChallenge() {
  const navigate = useNavigate();

  function challenge() {
    const token = localStorage.getItem(tokenName);
    const expired = validExpired(token);
    if (expired) {
      localStorage.removeItem(tokenName);
      navigate("@/account/sign");
    }
  }

  return {
    challenge,
  };
}

function validExpired(token: string | null) {
  if (!token) return true;
  try {
    const payload = jwtDecode(token);
    if (!payload.exp) return false;
    return payload.exp * 1000 < new Date().getTime();
  } catch (error) {
    return true;
  }
}
