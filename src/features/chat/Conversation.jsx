import { useChatContext } from "@/context/chat.context";
import { cn } from "@/utils";
import { Avatar } from "antd";
import PropTypes from "prop-types";
import { AiOutlineUser } from "react-icons/ai";

export function Conversation({ data }) {

    const { setCurrentConversation, currentConversation } = useChatContext();
    const user = data?.receiver;

    const handleClick = () => {
        setCurrentConversation(data);
    }

    return (
        <div
            onClick={handleClick}
            className={cn("p-3 rounded-lg shadow-md flex items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out dark:hover:bg-darkTer hover:bg-cBlue bg-gray-200 hover:text-white", {
                " dark:bg-darkTer text-white bg-cBlue ": data?._id === currentConversation?._id,

            })}
        >
            <Avatar
                src={user?.profileImage}
                alt={user?.name}
                icon={<AiOutlineUser />}
                className=" flex items-center justify-center border"
                size={40}
            />
            <h2
                className="text-lg font-semibold"
            >
                {user?.name}
            </h2>
        </div>
    )
}

Conversation.propTypes = {
    data: PropTypes.object.isRequired
}
