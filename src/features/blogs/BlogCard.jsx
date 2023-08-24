import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../users/UserApi";
import { useGetCategoryByIdQuery } from "../categories/categoriesApi";
import { memo } from "react";
import { Skeleton } from "antd";
import { LikeBtn } from "@/components";

let BlogCard = ({ blog, isDetail }) => {
    const id = blog?._id;
    const { data: userData, isLoading: isULoading } = useGetUserByIdQuery(
        blog?.userId
    );
    const author = userData?.data;
    const { data: categoryData, isLoading: isCLoading } =
        useGetCategoryByIdQuery(blog?.categoryId);
    const blogCategory = categoryData?.data;
    const date = new Date(blog?.createdAt).toLocaleString().split(",")[0];

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
            <div className="text-2xl font-bold  duration-200 w-fit flex flex-col-reverse md:items-center gap-2 md:flex-row ">
                {isDetail ? (
                    <h2> {blog?.title} </h2>
                ) : (
                    <Link
                        to={`/blogs/${id}`}
                        className="text-truncate hover:text-blue-500 duration-200"
                    >
                        {" "}
                        {blog?.title}{" "}
                    </Link>
                )}
                <span className="text-sm px-2 py-1 rounded-md bg-blue-600 text-white font-normal w-fit">
                    {" "}
                    {blogCategory?.title}{" "}
                </span>
            </div>
            <div
                className={`text-gray-500 ${
                    isDetail ? " whitespace-pre-line" : "line-clamp-2"
                }  `}
            >
                {isDetail ? (
                    <p> {blog?.description} </p>
                ) : (
                    <Link to={`/blogs/${id}`}> {blog?.description} </Link>
                )}
            </div>
            <div className="flex flex-col-reverse md:flex-row md:items-center justify-between mt-auto gap-2">
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
            <LikeBtn blog={blog} />
        </article>
    );
};

BlogCard = memo(BlogCard);

export default BlogCard;
