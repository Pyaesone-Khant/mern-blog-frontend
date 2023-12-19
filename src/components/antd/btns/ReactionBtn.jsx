import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useSetUserReactionMutation } from "@/features/blogs/blogApi";
import { useNavigate } from "react-router-dom";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {setAlertMessage} from "@/core/globalSlice.js";
import {FaHeart, FaRegHeart} from "react-icons/fa";

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
            <button onClick={handleBlogReaction} className={`reaction-btn `}>
                {isLiked && isLoggedIn ? (
                    <FaHeart />
                ) : isLiked && !isLoggedIn ? (
                    <FaRegHeart />
                ) : (
                    <FaRegHeart />
                )}
            <p className=" text-sm font-medium tracking-widest ">
                {" "}
                <span className={`font-grm mr-1`}>
                    {reactionsCount > 0 ? reactionsCount : ""}
                </span>
                {reactionsCount > 1
                    ? "Likes"
                    : reactionsCount === 1
                    ? "Like"
                    : ""}
            </p>
            </button>
    );
};

export default ReactionBtn;
