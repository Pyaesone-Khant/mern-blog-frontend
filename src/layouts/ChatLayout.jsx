import { useChatContext } from "@/context/chat.context";
import { ChatBox, ConversationList } from "@/features/chat";
import { useEffect, useState } from "react";

export function ChatLayout() {

    const isThemeActive = window.localStorage.getItem("theme")
        ? window.localStorage.getItem("theme")
        : false;

    const [theme, setTheme] = useState(isThemeActive);

    const { currentConversation } = useChatContext();
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
                className="min-h-screen grid lg:grid-cols-4 grid-cols-5 max-md:grid-cols-1 dark:bg-darkBg"
            >
                <ConversationList />
                {
                    currentConversation ? (
                        <ChatBox />
                    ) : (
                        <div className="col-span-3 flex items-center justify-center h-full border-l dark:border-white/20">
                            <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-400">Select a conversation to start chatting</h1>
                        </div>
                    )
                }
            </section>
        </main>
    )
}
