import { Logo } from "@/components";
import { useChatContext } from "@/context/chat.context";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "./chatApi";
import { Conversation } from "./Conversation";

export function ConversationList() {

    const { setCurrentConversation } = useChatContext();
    const { data } = useGetConversationsQuery();

    useEffect(() => {
        if (data) {
            setCurrentConversation(data[0]);
        }
    }, [data, setCurrentConversation]);

    return (
        <section
            className="space-y-4 lg:col-span-1 col-span-2 dark:bg-darkBg duration-200"
        >
            <Link
                to={"/"}
                className="flex items-center justify-center gap-4 mb-4  p-4 border-b dark:border-white/20 "
            >
                <Logo
                    className="w-14 mx-0"
                />
                <h1
                    className="text-3xl font-bold dark:text-white text-c1A"
                >
                    WriteeChat
                </h1>
            </Link>
            <div
                className="space-y-4 p-4"
            >
                {
                    data?.map((it) => (
                        <Conversation
                            key={it._id}
                            data={it}
                        />
                    ))
                }
            </div>
        </section>
    )
}