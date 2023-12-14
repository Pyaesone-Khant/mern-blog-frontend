import { useState } from "react";
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {
    useSaveBlogsMutation,
    useGetUserDataQuery,
} from "@/features/users/UserApi";
import { useNavigate } from "react-router-dom";
import {setAlertMessage} from "@/core/globalSlice.js";

const SaveBtn = ({ blogId }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    const { data } = useGetUserDataQuery();
    const currentUser = data?.data;

    const savedBlogsList = currentUser?.savedBlogs;
    const isAlreadySaved = savedBlogsList?.includes(blogId);
    const [isSaved, setIsSaved] = useState(isAlreadySaved);

    const [saveBlogs] = useSaveBlogsMutation();
    const nav = useNavigate();

    const dispatch = useDispatch()

    const handleSaveBlog = async () => {
        if (isLoggedIn) {
            try {
                setIsSaved(!isSaved);
                await saveBlogs({ userId: currentUser?._id, blogId });
            } catch (error) {
                throw new Error(error);
            }
        } else {
            dispatch(setAlertMessage({type : "info", content : "Please login first!"}));
            return nav("/login");
        }
    };

    return (

            <button
                onClick={handleSaveBlog}
                className={`outline-none border-none text-blue-600 dark:text-darkTer text-2xl duration-200`}
            >
                {isSaved && isLoggedIn ? (
                    <BsBookmarkCheckFill />
                ) : isSaved && !isLoggedIn ? (
                    <BsBookmarkPlus />
                ) : (
                    <BsBookmarkPlus />
                )}
            </button>
    );
};

export default SaveBtn;
