import { useGetUserDataQuery } from "@/features/users/UserApi.js";
import { useAuth } from "@/hooks/useAuth.js";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { token } = useAuth();
    const { data: currentUser, isLoading } = useGetUserDataQuery(null, {
        skip: !token,
    });

    useEffect(() => {
        if (!isLoading && currentUser && token) {
            setIsMounted(true);
        }
    }, [isLoading, token, currentUser]);

    return isMounted && { currentUser, isLoading };
};
