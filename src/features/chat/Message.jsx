import { useCurrentUser } from "@/hooks/useCurrentUser"
import { cn } from "@/utils"
import { Avatar } from "antd"
import { formatDistanceToNowStrict } from "date-fns"
import PropTypes from "prop-types"
import { AiOutlineUser } from "react-icons/ai"

export function Message({
    message
}) {

    const { currentUser } = useCurrentUser();

    return (
        <article
            key={message._id}
            className={cn("max-w-xs flex flex-col gap-1 w-full", {
                "self-end ": currentUser?._id === message.sender?._id,
            })}
        >
            <div
                className={cn("max-w-xs flex items-end gap-2 w-full", {
                    "flex-row-reverse": currentUser?._id === message.sender?._id,
                })}
            >
                <Avatar
                    src={message.sender?.profileImage}
                    size={36}
                    alt="User"
                    icon={<AiOutlineUser />}
                />
                <p
                    className={cn("p-2 flex-1 text-[15px] bg-blue-600 dark:bg-darkTer rounded-xl space-y-1 text-white")}
                >
                    {message.text}
                </p>
            </div>
            <p
                className={cn("text-[13px] text-gray-500 font-medium", {
                    "text-right pr-12": currentUser?._id === message.sender?._id,
                    "pl-12": currentUser?._id !== message.sender?._id,
                })}
            >
                {formatDistanceToNowStrict(new Date(message?.createdAt), { addSuffix: true })}
            </p>
        </article>
    )
}

Message.propTypes = {
    message: PropTypes.object.isRequired
}
