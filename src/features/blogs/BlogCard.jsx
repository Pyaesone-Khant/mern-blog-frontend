import { useGetUserByIdQuery } from "../users/UserApi";
import { useGetCategoryByIdQuery } from "../categories/categoriesApi";
import { memo } from "react";
import { Skeleton } from "antd";
import { LikeBtn } from "@/components";
import BlogCardHeader from "./BlogCardHeader";
import BlogCardDesc from "./BlogCardDesc";
import Author from "./Author";
import {AWS_IMAGE_URL} from "@/Constants.js";
import {Link} from "react-router-dom";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
]

let BlogCard = ({ blog, isDetail }) => {
    const {_id : blogId, blogImage, userId, createdAt, categoryId, title} = blog
    
    const { data: userData, isLoading: isULoading } = useGetUserByIdQuery(
        userId
    );
    const author = userData?.data;

    const { data: categoryData, isLoading: isCLoading} =
        useGetCategoryByIdQuery(categoryId);
    const blogCategory = categoryData?.data;
    const date = new Date(createdAt).toLocaleString().split(",")[0];

    const day = new Date(createdAt).getDate();
    const month = months[new Date(createdAt).getMonth()];
    const year = new Date(createdAt).getFullYear();


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
                <div className="flex flex-row items-center gap-1 mb-1">
                    <Author author={author} userId={userId} isComment={true} />
                    <p className={` text-sm dark:text-gray-300 text-gray-600 `}>· {month} {day} {year} </p>
                </div>

                    <BlogCardHeader
                        blog={blog}
                        blogCategory={blogCategory}
                        isDetail={isDetail}
                    />

                    <div className={`overflow-hidden flex ${ isDetail ? " flex-col" : "flex-col-reverse" } gap-3`}>
                        <Link to={`/blogs/${blogId}`} className={` w-full h-full overflow-hidden rounded ${isDetail ? " max-h-80 pointer-events-none" :  "max-h-60"}`}>
                            <img src={blogImage ? AWS_IMAGE_URL + blogImage : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" } alt={`${title} Image`} className={`w-full h-full object-center object-cover group-hover:scale-110 duration-200`} />
                        </Link>

                        <BlogCardDesc blog={blog} isDetail={isDetail} />
                    </div>


                    <div className={` ${isDetail ? "py-1" : " hidden "} `}>
                        <LikeBtn blog={blog} />
                    </div>
            </article>
    );
};

BlogCard = memo(BlogCard);

export default BlogCard;
