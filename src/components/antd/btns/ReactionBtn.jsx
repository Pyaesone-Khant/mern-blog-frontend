import { Tooltip } from "antd";
import { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useSetUserReactionMutation } from "@/features/blogs/blogApi";
import { useNavigate } from "react-router-dom";

const ReactionBtn = ({ blog }) => {
    const { isLoggedIn, user: currentUser } = useSelector(
        (state) => state.auth
    );
    const [setUserReaction] = useSetUserReactionMutation();

    const reactionsCount = blog?.reactions.length;
    const isAlreadyLiked = blog?.reactions.includes(currentUser?._id);
    const [isLiked, setIsLiked] = useState(isAlreadyLiked);
    const nav = useNavigate();

    const handleBlogReaction = async () => {
        if (isLoggedIn) {
            const requiredIds = { userId: currentUser?._id, blogId: blog?._id };
            try {
                setIsLiked(!isLiked);
                await setUserReaction(requiredIds);
            } catch (error) {
                throw new Error(error);
            }
        } else {
            return nav("/login", { state: "Please login first!" });
        }
    };

    return (
        <div className="flex items-center gap-3">
                <button onClick={handleBlogReaction} className={`reaction-btn`}>
                    {isLiked && isLoggedIn ? (
                        <BsHandThumbsUpFill />
                    ) : isLiked && !isLoggedIn ? (
                        <BsHandThumbsUp />
                    ) : (
                        <BsHandThumbsUp />
                    )}
                </button>{" "}
            <p className="font-medium text-blue-600 dark:text-darkTer">
                {" "}
                {reactionsCount > 0 ? reactionsCount : ""}
                {reactionsCount > 1
                    ? "Likes"
                    : reactionsCount === 1
                    ? "Like"
                    : ""}{" "}
            </p>
        </div>
    );
};

export default ReactionBtn;
