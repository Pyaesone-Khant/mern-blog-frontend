import { useEffect, useState } from "react";

// icons
import { MdOutlineSearch } from "react-icons/md";
import { RxPencil2 } from "react-icons/rx";

// styles
import "./link.css";

// components
import { CustomBtn, Logo } from "@/components/index.js";
import SearchBar from "@/components/navbar/SearchBar.jsx";
import ThemeBtn from "../antd/btns/ThemeBtn";
import AccountMenu from "./AccountMenu";
import CNavlink from "./CNavlink";

// hooks
import { useAuth } from "@/hooks/useAuth.js";
import { useResponsive } from "@/hooks/useResponsive.js";

// reducers
import { setCurrentPage } from "@/features/blogs/blogSlice.js";

// utils
import { cn } from "@/utils.js";

// third-party
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const { token } = useAuth();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { isMobile } = useResponsive();

    useEffect(() => {
        if (!isMobile) {
            setIsActive(false);
        }
    }, [isMobile]);

    const backToHome = () => {
        dispatch(setCurrentPage(1));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        nav("/");
    };

    return (
        <header
            className="py-3 sticky top-0 shadow-lg border-b z-20 backdrop-blur-2xl bg-white dark:bg-darkBgSec dark:text-white dark:border-darkTer/20 duration-200">
            <nav className="md:w-[95%] w-[90%] mx-auto flex items-center justify-between">
                <div className={`flex items-center gap-5`}>
                    <Logo
                        className={`md:w-10 md:h-10 h-8 w-8 cursor-pointer mx-0`}
                        onClick={backToHome}
                    />
                    {isMobile ? (
                        <CustomBtn
                            onClick={() => setIsActive(!isActive)}
                            className={cn(
                                `px-0 py-0 w-9 h-9 !rounded-full flex items-center justify-center`
                            )}
                        >
                            <MdOutlineSearch className={`!text-lg`} />
                        </CustomBtn>
                    ) : (
                        <SearchBar />
                    )}
                </div>
                {token ? (
                    <nav className={cn("flex items-center gap-5")}>
                        {!isMobile && (
                            <CNavlink href={"/write"} className={"px-0"}>
                                <RxPencil2
                                    className={`!text-xl stroke-[0.3px]`}
                                />
                                write
                            </CNavlink>
                        )}
                        <ThemeBtn />
                        <AccountMenu />
                    </nav>
                ) : (
                    <nav className={cn("flex items-center gap-5")}>
                        <ThemeBtn />
                        <CNavlink
                            href={"/register"}
                            className={`!text-cBlue dark:!text-darkTer px-1`}
                        >
                            Register
                        </CNavlink>
                        <CNavlink
                            href={"/login"}
                            className={`!bg-cBlue dark:!bg-darkTer !text-white`}
                        >
                            Login
                        </CNavlink>
                    </nav>
                )}
            </nav>
            {isActive && (
                <div className={`pt-3 px-6`}>
                    <SearchBar event={() => setIsActive(false)} />
                </div>
            )}
        </header>
    );
};

export default Navbar;
