import { Link, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../users/UserApi";
import { useGetCategoryByIdQuery } from "../categories/categoriesApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSetUserReactionMutation } from "./blogApi";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { Skeleton, Tooltip } from "antd";

const BlogCard = ({ blog, isDetail }) => {
    const id = blog?._id;
    const { data: userData, isLoading: isULoading } = useGetUserByIdQuery(
        blog?.userId
    );
    const author = userData?.data;
    const { data: categoryData, isLoading: isCLoading } =
        useGetCategoryByIdQuery(blog?.categoryId);
    const [setUserReaction] = useSetUserReactionMutation();
    const blogCategory = categoryData?.data;
    const { user: currentUser, isLoggedIn } = useSelector(
        (state) => state.auth
    );
    const reactionsCount = blog?.reactions.length;
    const isAlreadyLiked = blog?.reactions.includes(currentUser?._id);
    const [isLiked, setIsLiked] = useState(isAlreadyLiked);
    const nav = useNavigate();

    const handleBlogReaction = async () => {
        if (isLoggedIn) {
            const requiredIds = { userId: currentUser?._id, blogId: id };
            try {
                await setUserReaction(requiredIds);
                setIsLiked(!isLiked);
            } catch (error) {
                throw new Error(error);
            }
        } else {
            return nav("/login", { state: "Please login first!" });
        }
    };
    const date = new Date(blog?.createdAt)
        .toDateString()
        .slice(4)
        .replace(/ /gi, " / ");

    if (isULoading || isCLoading) {
        return (
            <div className="card">
                <Skeleton active />
            </div>
        );
    }

    return (
        <article
            className={` rounded-md ${isDetail ? "detail-card" : "card"} `}
        >
            <div className="text-xl font-bold  duration-200 w-fit flex items-center gap-2 ">
                {isDetail ? (
                    <h2 className="text-2xl"> {blog?.title} </h2>
                ) : (
                    <Link
                        to={`/blogs/${id}`}
                        className="text-truncate hover:text-blue-500 duration-200"
                    >
                        {" "}
                        {blog?.title}{" "}
                    </Link>
                )}
                <span className="text-sm px-2 py-1 rounded-md bg-blue-600 text-white font-normal">
                    {" "}
                    {blogCategory?.title}{" "}
                </span>
            </div>
            {isDetail ? (
                <p
                    className={`text-gray-500 ${
                        isDetail ? " whitespace-pre-line" : "line-clamp-2"
                    }  `}
                >
                    {" "}
                    {blog?.description}{" "}
                </p>
            ) : (
                <Link
                    to={`/blogs/${id}`}
                    className={`text-gray-500 ${
                        isDetail ? " whitespace-pre-line" : "line-clamp-2"
                    }  `}
                >
                    {" "}
                    {blog?.description}{" "}
                </Link>
            )}
            <div className="flex items-center justify-between mt-auto">
                <p className=" font-medium">
                    {" "}
                    By{" "}
                    <Link
                        to={`/users/${blog?.userId}`}
                        className=" italic underline underline-offset-2 hover:text-blue-600 duration-200"
                    >
                        {" "}
                        {author?.name}{" "}
                    </Link>{" "}
                </p>
                <p> {date} </p>
            </div>
            <div className="flex items-end gap-3">
                <Tooltip
                    placement="top"
                    className="font-sans"
                    title={
                        <p
                            className="font-sans tracking-wide
                        "
                        >
                            {isLiked ? "Liked" : "Un-Liked"}
                        </p>
                    }
                >
                    <button
                        onClick={handleBlogReaction}
                        className={`reaction-btn`}
                    >
                        {isLiked && isLoggedIn ? (
                            <BsHandThumbsUpFill />
                        ) : isLiked && !isLoggedIn ? (
                            <BsHandThumbsUp />
                        ) : (
                            <BsHandThumbsUp />
                        )}
                    </button>{" "}
                </Tooltip>

                <p className="text-lg font-medium text-blue-600">
                    {" "}
                    {reactionsCount > 0 ? reactionsCount : ""}{" "}
                    {reactionsCount > 1
                        ? "Likes"
                        : reactionsCount === 1
                        ? "Like"
                        : ""}{" "}
                </p>
            </div>
        </article>
    );
};

export default BlogCard;
