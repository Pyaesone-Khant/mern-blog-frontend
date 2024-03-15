import { CustomBtn, Logo } from "@/components/index.js";
import SearchBlogForm from "@/features/blogs/SearchBlogForm.jsx";
import { setCurrentPage } from "@/features/blogs/blogSlice.js";
import { useAuth } from "@/hooks/useAuth.js";
import { useResponsive } from "@/hooks/useResponsive.js";
import { cn } from "@/utils.js";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { RxPencil2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeBtn from "../antd/btns/ThemeBtn";
import AccountMenu from "./AccountMenu";
import CNavlink from "./CNavlink";
import "./link.css";

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
        <header className="py-3 sticky top-0 shadow-lg border-b z-20 backdrop-blur-2xl bg-white dark:bg-darkBgSec dark:text-white dark:border-darkTer/20 duration-200">
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
                        <SearchBlogForm />
                    )}
                </div>
                {token ? (
                    <nav className={cn("flex items-center gap-5")}>
                        {!isMobile && (
                            <CNavlink href={"/write"}>
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
                    <nav className={cn("flex items-center gap-3")}>
                        <ThemeBtn />
                        <CNavlink
                            href={"/register"}
                            className={`!text-cBlue dark:!text-darkTer`}
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
                    <SearchBlogForm event={() => setIsActive(false)} />
                </div>
            )}
        </header>
    );
};

export default Navbar;
