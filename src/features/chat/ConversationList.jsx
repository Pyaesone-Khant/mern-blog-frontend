import { Logo } from "@/components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "./chatApi";
import { Conversation } from "./Conversation";

export function ConversationList({ activeUsers }) {

    const { data } = useGetConversationsQuery();

    return (
        <section
            className="space-y-4 lg:col-span-1 col-span-2 duration-200 max-md:border-b dark:border-white/20"
        >
            <Link
                to={"/"}
                className="flex items-center justify-center gap-4 mb-4  p-4 border-b dark:border-white/20"
            >
                <Logo
                    className="w-14 mx-0"
                />
                <h1
                    className="text-3xl font-bold dark:text-white text-c1A"
                >
                    Writee
                </h1>
            </Link>
            <div
                className="space-y-4 p-4 max-w-2xl mx-auto"
            >
                {
                    data?.map((it) => (
                        <Conversation
                            key={it._id}
                            data={it}
                            isActive={activeUsers?.some((userId) => userId === it.receiver._id)}
                        />
                    ))
                }
            </div>
        </section>
    )
}

ConversationList.propTypes = {
    activeUsers: PropTypes.array.isRequired
}