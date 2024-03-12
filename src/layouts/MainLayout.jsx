import {Outlet} from "react-router-dom";
import {Footer, Nav} from "../components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleMenu} from "@/core/globalSlice.js";
import {cn} from "@/utils.js";
import {useGetRefreshToken} from "@/hooks/useGetRefreshToken.js";

const MainLayout = () => {
    const isThemeActive = window.localStorage.getItem("theme")
        ? window.localStorage.getItem("theme")
        : false;

    const [theme, setTheme] = useState(isThemeActive);
    const {isOpen} = useSelector(state => state.global)
    const dispatch = useDispatch()

    useGetRefreshToken();

    useEffect(() => {
        window.addEventListener("storage", () => {
            const theme = window.localStorage.getItem("theme")
                ? window.localStorage.getItem("theme")
                : false;
            setTheme(theme);
        });
    }, []);

    return (
        <main className={` ${theme === "dark" ? "dark" : ""} `}>
            <section
                className={`flex flex-col bg-cFF text-c1A dark:bg-darkBgSec dark:text-gray-200  min-h-screen duration-200`}
            >
                {/* navbar */}
                <Nav/>


                <div onClick={() => dispatch(toggleMenu(false))}
                     className={cn(`w-full h-screen bg-black bg-opacity-60 fixed top-0 left-0 z-10 transform translate-y-[-100vh] duration-300`, {"translate-y-0": isOpen})}/>


                {/* main content */}
                <section className=" flex-1 flex w-[90%] mx-auto py-5 pb-10">
                    <Outlet/>
                </section>

                {/* footer */}
                <Footer/>
            </section>
        </main>
    );
};

export default MainLayout;
