import { ChatBox, ConversationList } from "@/features/chat";
import { useEffect, useState } from "react";

export function ChatLayout() {

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
    }, [])

    return (
        <main
            className={` ${theme === "dark" ? "dark" : ""} `}
        >
            <section
                className="min-h-screen grid lg:grid-cols-4 grid-cols-5"
            >
                <ConversationList />
                <ChatBox />
            </section>
        </main>
    )
}
