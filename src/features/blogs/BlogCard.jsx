import { useGetUserByIdQuery } from "../users/UserApi";
import { useGetCategoryByIdQuery } from "../categories/categoriesApi";
import { memo } from "react";
import { Skeleton } from "antd";
import { LikeBtn } from "@/components";
import BlogCardHeader from "./BlogCardHeader";
import BlogCardDesc from "./BlogCardDesc";
import Author from "./Author";
import {BLOG_IMAGE_URL} from "@/Constants.js";
import {Link} from "react-router-dom";

let BlogCard = ({ blog, isDetail, isBFetching }) => {
    const {_id : blogId, blogImage, userId, createdAt, categoryId, title} = blog
    
    const { data: userData, isLoading: isULoading } = useGetUserByIdQuery(
        userId
    );
    const author = userData?.data;

    const { data: categoryData, isLoading: isCLoading} =
        useGetCategoryByIdQuery(categoryId);
    const blogCategory = categoryData?.data;
    const date = new Date(createdAt).toLocaleString().split(",")[0];

    if (isULoading || isCLoading) {
        return (
            <div className="card">
                <Skeleton active/>
            </div>
        );
    }

    return (
            <article
                className={` rounded-md ${isDetail ? "detail-card" : "card group"} overflow-hidden`}
            >
                    <BlogCardHeader
                        blog={blog}
                        blogCategory={blogCategory}
                        isDetail={isDetail}
                    />

                    <Link to={`/blogs/${blogId}`} className={` w-full h-full overflow-hidden rounded ${isDetail ? " max-h-80 pointer-events-none" : " max-h-60 shadow"}`}>
                        <img src={blogImage ? BLOG_IMAGE_URL + blogImage : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" } alt={`${title} Image`} className={`w-full h-full object-center object-cover group-hover:scale-110 duration-200`} />
                    </Link>

                    <BlogCardDesc blog={blog} isDetail={isDetail} />

                    <div className="flex flex-col-reverse md:flex-row md:items-center justify-between mt-auto gap-2">
                        <p className="font-medium flex gap-1 ">
                            {" "}
                            By <Author author={author} userId={userId} />
                        </p>
                        <p> {date} </p>
                    </div>
                    <div className={` ${isDetail ? "py-1" : ""} `}>
                        <LikeBtn blog={blog} />
                    </div>
            </article>
    );
};

BlogCard = memo(BlogCard);

export default BlogCard;
