import ThemeBtn from "@/components/antd/btns/ThemeBtn";
import { WS_URL } from "@/constants";
import { useChatContext } from "@/context/chat.context";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/utils";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Author from "../blogs/components/Author";
import { useGetMessagesQuery } from "./chatApi";
import { Message } from "./Message";
import { MessageForm } from "./MessageForm";

export function ChatBox() {

    const { currentConversation } = useChatContext();
    const { data: messages, isLoading } = useGetMessagesQuery(currentConversation?._id, {
        skip: !currentConversation?._id,
        refetchOnMountOrArgChange: true,
    });
    const [chatMessages, setChatMessages] = useState([]);

    const messageEndRef = useRef(null);
    const receiver = currentConversation?.receiver;
    const { currentUser } = useCurrentUser();
    const socket = useRef(io(WS_URL, {
        transports: ["polling", "websocket"],
    }));

    useEffect(() => {
        socket.current = io(WS_URL, {
            transports: ["polling", "websocket"],
        })

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
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages])

    useEffect(() => {
        const sc = socket.current;

        sc.on("connect", () => {
            console.log("connected to socket server!");
            sc.emit("join", currentUser?._id);
            sc.on("getUsers", (users) => {
                console.log(users)
            });
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

    return (
        <div
            className="col-span-3 bg-white dark:bg-darkBg place-items-center border-l dark:border-white/20 duration-200 "
        >
            <div
                className="max-w-2xl w-full h-screen flex flex-col p-5 pt-0 gap-4"
            >
                <div
                    className="flex items-center gap-4 border-b dark:border-white/20 bg-black/10 dark:bg-white/10 p-3 rounded-b-xl justify-between"
                >
                    <Author
                        author={receiver}
                        isDetail={true}
                    />
                    <ThemeBtn />
                </div>

                <div
                    className="flex-1 border dark:border-white/40 rounded-md flex flex-col overflow-y-scroll gap-4 p-2 py-4"
                >

                    {
                        isLoading && (
                            <>
                                <MessageLoader
                                    isUserMsg={true}
                                />
                                <MessageLoader
                                    isUserMsg={false}
                                />
                            </>
                        )
                    }

                    {
                        chatMessages?.map((msg) => (
                            <Message
                                key={msg._id ?? msg.createdAt}
                                message={msg}
                            />
                        ))
                    }
                    <div
                        ref={messageEndRef}
                    />
                </div>

                <MessageForm
                    socket={socket.current}

                />
            </div>
        </div>
    );
}

const MessageLoader = ({
    isUserMsg = false,
}) => (
    <div
        className={cn("flex flex-col gap-2 max-w-xs w-full", {
            "self-end": isUserMsg,
        })}
    >
        <div
            className={cn("flex items-end gap-2 w-full", {
                "flex-row-reverse": isUserMsg,
                "flex-row": !isUserMsg,
            })}
        >
            <div
                className="animate-pulse w-9 aspect-square bg-gray-300 rounded-full"
            />
            <div
                className={cn("p-2 flex-1 h-20 w-full bg-gray-300 animate-pulse rounded-xl")}
            />
        </div>
        <div
            className={cn("animate-pulse w-32 h-4 bg-gray-300 rounded-full", {
                "ml-12": !isUserMsg,
                "ml-auto mr-12": isUserMsg,
            })}
        />
    </div>
)

MessageLoader.propTypes = {
    isUserMsg: PropTypes.bool,
}