import {useNavigate} from "react-router-dom";
import CNavlink from "./CNavlink";
import AccountMenu from "./AccountMenu";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import {RxCross1, RxHamburgerMenu, RxHome, RxPencil2} from "react-icons/rx";
import ThemeBtn from "../antd/btns/ThemeBtn";
import "./link.css";
import {setCurrentPage} from "@/features/blogs/blogSlice.js";
import {setKeyword} from "@/features/categories/categoriesSlice.js";
import logo from "@/assets/images/img_logo3.png";
import logoDark from "@/assets/images/img_logo2.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleMenu = () => {
        setIsOpen(!isOpen);
    };

    const dispatch = useDispatch();
    const nav = useNavigate();

    const backToHome = () => {
        dispatch(setCurrentPage(1));
        dispatch(setKeyword("all"))
        setIsOpen(false)
        nav("/");
    }

    return (
        <header className="py-5 sticky top-0 shadow-lg border-b z-10 backdrop-blur-md bg-white dark:bg-slate-700 dark:border-none dark:text-white dark:border-slate-600 duration-200">
            <nav className="w-[90%] mx-auto flex items-center justify-between flex-col md:flex-row">
                <div className="w-full md:w-auto flex items-center justify-between">
                    <h1
                        onClick={backToHome}
                        className="cursor-pointer dark:text-white "
                    >
                        <img src={logo} className={`max-h-9 dark:hidden`} />
                        <img src={logoDark} className={`max-h-9 dark:block hidden`} />

                    </h1>
                    <div className="flex items-center gap-3 md:justify-end">
                        <div className="md:hidden flex items-center justify-center">
                            <ThemeBtn />
                        </div>
                        <button
                            onClick={handleMenu}
                            className=" outline-none w-fit p-2 px-3 rounded-md text-black md:hidden text-3xl active:bg-none dark:text-white"
                        >
                            {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
                        </button>
                    </div>
                </div>
                <nav
                    className={`w-full md:w-auto pt-[72px] top-0 md:pt-0 bg-white md:dark:bg-transparent dark:bg-slate-700 fixed md:relative transform pb-5 md:pb-0 shadow-md md:shadow-none border-b dark:border-none md:border-none md:translate-y-0 md:opacity-100 ${
                        isOpen
                            ? "  opacity-100 translate-y-0  "
                            : " opacity-0 -translate-y-[100vh]"
                    } duration-500 overflow-hidden -z-[1] md:z-auto`}
                >
                    {isLoggedIn ? (
                        <ul className="nav-ul">
                            <div className="hidden md:flex items-center justify-center">
                                <ThemeBtn />
                            </div>
                            <CNavlink
                                event={backToHome}
                                path={"/"}
                                title={"home"}
                                icon={<RxHome/>}
                            />
                            <CNavlink
                                event={() => setIsOpen(false)}
                                path={"/create_blog"}
                                title={"write"}
                                icon={<RxPencil2/>}
                            />
                            <AccountMenu
                                event={() => setIsOpen(false)}
                            />
                        </ul>
                    ) : (
                        <ul className="nav-ul">
                            <div className="hidden md:flex items-center justify-center">
                                <ThemeBtn />
                            </div>
                            <CNavlink
                                event={() => setIsOpen(false)}
                                path={"/register"}
                                title={"register"}
                            />
                            <CNavlink
                                event={() => setIsOpen(false)}
                                path={"/login"}
                                title={"login"}
                            />
                        </ul>
                    )}
                </nav>
            </nav>
        </header>
    );
};

export default Navbar;
