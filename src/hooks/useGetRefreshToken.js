import { useEffect } from "react";
import { useDispatch } from "react-redux";

// core
import { setAlertMessage } from "@/core/globalSlice.js";

// hooks
import { useAuth } from "@/hooks/useAuth.js";

const BASE_URL = import.meta.env.VITE_PROD_API_URL;

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
            const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
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
