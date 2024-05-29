import { setAlertMessage } from "@/core/globalSlice.js";
import { useAuth } from "@/hooks/useAuth.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// const baseUrl = "https://blogapp-apis.onrender.com/api"
const baseUrl = "http://localhost:3500/api";

export const useGetRefreshToken = () => {
    const { token, saveToken, expiredAt, saveExpiredAt } = useAuth();
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
            }).then((res) => res.json());
            if (!res?.success) {
                saveToken("");
                saveExpiredAt("");
                dispatch(
                    setAlertMessage({
                        type: "error",
                        message: "Something went wrong! Please login again",
                    })
                );
            } else {
                saveToken(res?.token);
                saveExpiredAt(res?.expiredAt);
                dispatch(
                    setAlertMessage({ type: "success", message: res?.message })
                );
            }
        } catch (error) {
            saveToken("");
            saveExpiredAt("");
            dispatch(
                setAlertMessage({
                    type: "error",
                    message: "Something went wrong! Please login again",
                })
            );
        }
    };

    return null;
};
