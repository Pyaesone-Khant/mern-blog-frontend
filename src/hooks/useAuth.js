import {useLocalStorage} from "@uidotdev/usehooks"

export const useAuth = () => {
    const [token, saveToken] = useLocalStorage("accessToken", "");
    const [expiredAt, saveExpiredAt] = useLocalStorage("expirationTime", "");

    return {
        token,
        saveToken,
        expiredAt,
        saveExpiredAt,
    }
}