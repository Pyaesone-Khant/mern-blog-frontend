import { Tooltip } from "antd";
import { useState } from "react";
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
    useSaveBlogsMutation,
    useGetUserByIdQuery,
} from "@/features/users/UserApi";
import { useNavigate } from "react-router-dom";

const SaveBtn = ({ blogId }) => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    const { data: currentUser } = useGetUserByIdQuery(user?._id);

    const savedBlogsList = currentUser?.data?.savedBlogs;
    const isAlreadySaved = savedBlogsList?.includes(blogId);
    const [isSaved, setIsSaved] = useState(isAlreadySaved);

    const [saveBlogs] = useSaveBlogsMutation();
    const nav = useNavigate();

    const handleSaveBlog = async () => {
        if (isLoggedIn) {
            try {
                setIsSaved(!isSaved);
                await saveBlogs({ userId: user?._id, blogId });
            } catch (error) {
                throw new Error(error);
            }
        } else {
            return nav("/login", { state: "Please login first!" });
        }
    };

    return (
        <Tooltip
            placement="top"
            title={
                <p className="font-sans"> {isSaved ? "Saved" : "Un-Saved"} </p>
            }
        >
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
        </Tooltip>
    );
};

export default SaveBtn;
