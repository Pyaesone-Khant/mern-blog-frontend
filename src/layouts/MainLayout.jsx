import {useEffect, useState} from "react";

// components
import {Footer, Nav} from "@/components";
import {Outlet} from "react-router-dom";

// hooks
import {useGetRefreshToken} from "@/hooks/useGetRefreshToken.js";

const MainLayout = () => {
    const isThemeActive = window.localStorage.getItem("theme")
        ? window.localStorage.getItem("theme")
        : false;

    const [theme, setTheme] = useState(isThemeActive);

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
