import { Tooltip } from "antd";
import { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import { useSetUserReactionMutation } from "@/features/blogs/blogApi";
import { useNavigate } from "react-router-dom";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {setAlertMessage} from "@/core/globalSlice.js";

const ReactionBtn = ({ blog }) => {
    const { isLoggedIn } = useSelector(
        (state) => state.auth
    );

    const {data : userData} = useGetUserDataQuery();
    const currentUser = userData?.data

    const [setUserReaction] = useSetUserReactionMutation();
    const reactionsCount = blog?.reactions.length;
    const isAlreadyLiked = blog?.reactions.includes(currentUser?._id);
    const [isLiked, setIsLiked] = useState(isAlreadyLiked);
    const nav = useNavigate();
    const dispatch =useDispatch()

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
            dispatch(setAlertMessage({type: "info", content: `Please login to your account first!`}))
            return nav("/login");
        }
    };

    return (
        <div className="flex items-center gap-2">
                <button onClick={handleBlogReaction} className={`reaction-btn`}>
                    {isLiked && isLoggedIn ? (
                        <BsHandThumbsUpFill />
                    ) : isLiked && !isLoggedIn ? (
                        <BsHandThumbsUp />
                    ) : (
                        <BsHandThumbsUp />
                    )}
                </button>{" "}
            <p className=" text-sm font-medium text-blue-600 dark:text-darkTer tracking-widest ">
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
