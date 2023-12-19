import { useGetUserByIdQuery } from "../users/UserApi";
import { useGetCategoryByIdQuery } from "../categories/categoriesApi";
import { memo } from "react";
import { Skeleton } from "antd";
import { LikeBtn } from "@/components";
import BlogCardHeader from "./BlogCardHeader";
import BlogCardDesc from "./BlogCardDesc";
import Author from "./Author";
import {Link, Navigate, useNavigate} from "react-router-dom";

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

let BlogCard = ({ blog, isDetail, isRecommended }) => {
    const {_id : blogId, blogImage, userId, createdAt, categoryId, title} = blog;
    
    const { data: userData, isLoading: isULoading } = useGetUserByIdQuery(
        userId
    );
    const author = userData?.data;

    const nav = useNavigate()

    const { data: categoryData, isLoading: isCLoading} =
        useGetCategoryByIdQuery(categoryId);
    const blogCategory = categoryData?.data;

    const day = new Date(createdAt).getDate();
    const month = months[new Date(createdAt).getMonth()];
    const year = new Date(createdAt).getFullYear();

    const changeRoute = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        nav(`/blogs/${blogId}`, {state : categoryId})
    }

    if (isULoading || isCLoading) {
        return (
            <div className="card">
                <Skeleton active/>
            </div>
        );
    }

    return (
            <article
                className={` rounded-md ${isDetail ? "detail-card" :  "card group"} ${isRecommended ? "min-w-[360px]" : ""} `}
            >
                <div className="flex flex-row items-center gap-1">
                    <Author author={author} userId={userId} isComment={true} />
                    <p className={` text-xs dark:text-gray-300 text-gray-600 font-grm`}>· {month} {day} {year} </p>
                </div>

                <BlogCardHeader
                    blog={blog}
                    blogCategory={blogCategory}
                    isDetail={isDetail}
                    changeRoute={changeRoute}
                />

                <div className={`overflow-hidden flex ${ isDetail ? " flex-col" : "flex-col-reverse" } flex-1 gap-3`}>
                    <p onClick={changeRoute} className={`w-full h-full overflow-hidden rounded ${isDetail ? " min-h-max pointer-events-none" :  " max-h-60 h-full cursor-pointer "}`}>
                        <img src={blogImage ? blogImage : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt={`${title} Image`} className={` h-full object-cover w-full  group-hover:scale-110 duration-200`} />
                    </p>

                    <BlogCardDesc
                        blog={blog}
                        isDetail={isDetail}
                        changeRoute={changeRoute}
                    />
                </div>
            </article>
    );
};

BlogCard = memo(BlogCard);

export default BlogCard;
