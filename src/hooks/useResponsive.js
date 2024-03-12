import {useEffect, useState} from "react";
import {useMediaQuery} from "@uidotdev/usehooks"

export const useResponsive = () => {
    const [isMounted, setIsMounted] = useState(false);
    const isMobile = useMediaQuery("only screen and (max-width : 767.9px)");
    const isMediumDevice = useMediaQuery("only screen and (max-width : 900px)");
    const isTablet = useMediaQuery("only screen and (min-width : 768px) and (max-width : 1023.9px)");
    const isLaptop = useMediaQuery("only screen and (min-width : 1024px)");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted && {
        isMobile,
        isMediumDevice,
        isTablet,
        isLaptop,
    }
}