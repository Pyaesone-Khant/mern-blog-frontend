import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth.js";

export const useCurrentUser = () => {
    const [isMounted, setIsMounted] = useState(false);
    const {token} = useAuth();
    const {data: currentUser, isLoading} = useGetUserDataQuery()

    useEffect(() => {
        if (!isLoading && currentUser && token) {
            setIsMounted(true)
        }
    }, [isLoading, token, currentUser])

    return isMounted && {currentUser};
}