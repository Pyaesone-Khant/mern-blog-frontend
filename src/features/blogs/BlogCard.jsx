import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../users/UserApi";
import { useGetCategoryByIdQuery } from "../categories/categoriesApi";
import { memo } from "react";
import { Skeleton } from "antd";
import { LikeBtn } from "@/components";
import BlogCardHeader from "./BlogCardHeader";
import BlogCardDesc from "./BlogCardDesc";
import Author from "./Author";

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
            <BlogCardHeader
                blog={blog}
                blogCategory={blogCategory}
                isDetail={isDetail}
            />

            <BlogCardDesc blog={blog} isDetail={isDetail} />

            <div className="flex flex-col-reverse md:flex-row md:items-center justify-between mt-auto gap-2">
                <p className=" font-medium">
                    {" "}
                    By <Author name={author?.name} userId={blog?.userId} />
                </p>
                <p> {date} </p>
            </div>
            <LikeBtn blog={blog} />
        </article>
    );
};

BlogCard = memo(BlogCard);

export default BlogCard;
