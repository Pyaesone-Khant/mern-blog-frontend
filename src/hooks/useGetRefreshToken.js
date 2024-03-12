import {setAlertMessage} from "@/core/globalSlice.js";
import {useEffect} from "react";
import {useAuth} from "@/hooks/useAuth.js";
import {useDispatch} from "react-redux";

// const baseUrl = "https://blogapp-apis.onrender.com/api"
const baseUrl = "http://localhost:3500/api"

export const useGetRefreshToken = () => {

    const {token, saveToken, expiredAt, saveExpiredAt} = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token && expiredAt && new Date(expiredAt) <= new Date()) {
            getRefreshToken();
        }
    }, [token, expiredAt]);

    const getRefreshToken = async () => {
        try {
            const res = await fetch(`${baseUrl}/auth/refresh-token`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => res.json())
            if (!res?.success) {
                dispatch(setAlertMessage({type: "error", message: "Token refresh failed!"}));
            } else {
                saveToken(res?.token);
                saveExpiredAt(res?.expiredAt);
                dispatch(setAlertMessage({type: "success", message: res?.message}));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return null;

}