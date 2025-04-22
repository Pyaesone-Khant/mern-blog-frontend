import { WS_URL } from "@/constants";
import { useChatContext } from "@/context/chat.context";
import { ChatBox, ConversationList } from "@/features/chat";
import { useGetMessagesQuery } from "@/features/chat/chatApi";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function ChatLayout() {

    const isThemeActive = window.localStorage.getItem("theme")
        ? window.localStorage.getItem("theme")
        : false;

    const [theme, setTheme] = useState(isThemeActive);
    const socket = useRef(io(WS_URL, {
        transports: ["polling", "websocket"],
    }));
    const { currentUser } = useCurrentUser();
    const [activeUsers, setActiveUsers] = useState([]);

    const { currentConversation } = useChatContext();
    const { data: messages, isLoading } = useGetMessagesQuery(currentConversation?._id, {
        skip: !currentConversation?._id,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        socket.current = io(WS_URL, {
            transports: ["polling", "websocket"],
        });

        socket.current.on("getMessage", (msg) => {
            setChatMessages((prev) => ([...prev, msg]));
        });

        return () => {
            socket.current.off("getMessage");
        }

    }, []);

    useEffect(() => {
        setChatMessages(messages);
    }, [messages]);

    useEffect(() => {

        const sc = socket.current;

        sc.on("connect", () => {
            console.log("connected to socket server!");
        });
        sc.emit("join", currentUser?._id);

        sc.on("getUsers", (users) => {
            setActiveUsers(users?.map(user => user.userId));
        });

        // default event for connection error from socket.io
        sc.on("connect_error", (err) => {
            console.log("socket connection error: ", err);
        })

        // default event for disconnection from socket.io
        sc.on("disconnect", (reason, details) => {
            console.log("disconnected from socket server: ", reason);
            console.log("disconnect details: ", details);
        });

    }, [currentUser])

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
                <ConversationList
                    activeUsers={activeUsers}
                />
                {
                    currentConversation ? (
                        <ChatBox
                            messages={chatMessages}
                            isLoading={isLoading}
                            socket={socket.current}
                            activeUsers={activeUsers}
                        />
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
