import { useCurrentUser } from "@/hooks/useCurrentUser"
import { cn } from "@/utils"
import { Avatar } from "antd"
import PropTypes from "prop-types"
import { AiOutlineUser } from "react-icons/ai"
import { TimeAgo } from "./TimeAgo"

export function Message({
    message,
    isUserActive
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
                <div
                    className="relative"
                >
                    <Avatar
                        src={message.sender?.profileImage}
                        size={36}
                        alt="User"
                        icon={<AiOutlineUser />}
                    />
                    <p
                        className={cn("w-[10px] aspect-square absolute bottom-0 right-0 rounded-full border border-white", {
                            "bg-darkTer dark:bg-cBlue": message.sender?._id === currentUser?._id || isUserActive,
                            "bg-gray-400": message.sender?._id !== currentUser?._id && !isUserActive
                        })}
                    />
                </div>
                <p
                    className={cn("p-2 text-[15px] bg-blue-600 dark:bg-darkTer rounded-xl space-y-1 text-white")}
                >
                    {message.text}
                </p>
            </div>
            <TimeAgo
                timestamp={message.createdAt}
                className={cn({
                    "text-right pr-12": currentUser?._id === message.sender?._id,
                    "pl-12": currentUser?._id !== message.sender?._id,
                })}
            />
        </article>
    )
}

Message.propTypes = {
    message: PropTypes.object.isRequired,
    isUserActive: PropTypes.bool.isRequired
}
