import { Outlet } from "react-router-dom";
import { Footer, Nav } from "../components";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const isThemeActive = window.localStorage.getItem("theme")
        ? window.localStorage.getItem("theme")
        : false;

    const [theme, setTheme] = useState(isThemeActive);

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
                <Nav />
                {/* navbar */}

                <section className=" flex-1 flex w-[90%] mx-auto py-5">
                    <Outlet />
                </section>

                <Footer />
                {/* footer */}
            </section>
        </main>
    );
};

export default MainLayout;
