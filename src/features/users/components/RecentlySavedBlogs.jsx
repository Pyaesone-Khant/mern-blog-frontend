import React from 'react';

// components
import Author from "@/features/blogs/components/Author.jsx";
import {Link} from "react-router-dom";
import {Skeleton} from "antd";

// apis
import {useGetSavedBlogsQuery, useGetUserByIdQuery} from "@/features/users/UserApi.js";
import {useGetRandomBlogsQuery} from "@/features/blogs/blogApi.js";

// hooks
import {useAuth} from "@/hooks/useAuth.js";
import {useSlugChanger} from "@/hooks/useSlugChanger.js";

// utils
import {formatDate} from "@/utils.js";

const RecentlySavedBlogs = () => {

    const {token} = useAuth();

    const {data: savedBlogs, isLoading: isSBLoading} =
        useGetSavedBlogsQuery();

    const userSavedBlogs = savedBlogs?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

    const {data: randomBlogs, isLoading: isRBLoading} = useGetRandomBlogsQuery();

    const displayedBlogs = token ? userSavedBlogs : randomBlogs
    const title = token ? "Recently Saved Blogs" : "Admin's Recommended Blogs";

    return (
        <section className={`w-full max-w-[40%] lg:max-w-[30%]`}>
            <h2 className={`font-semibold text-lg mb-4 text-cBlue dark:text-darkTer self`}> {title} </h2>

            <div className={`space-y-8`}>
                {
                    isSBLoading || isRBLoading ? Array(4).fill(null).map((_, i) => <BlogLoader
                        key={i}/>) : displayedBlogs?.map(blog => <SavedBlog blog={blog} key={blog?._id}/>)
                }
            </div>
        </section>
    );
};

const SavedBlog = ({blog}) => {

    const {_id: blogId, title, description, userId, createdAt} = blog;

    const {data: author, isLoading: isALoading} = useGetUserByIdQuery(userId);

    const titleSlug = useSlugChanger(title)
    const nameSlug = useSlugChanger(author?.name)
    const date = formatDate(createdAt);

    return <section className={`space-y-1`}>
        <Author author={author}/>
        <Link to={`/${nameSlug}/${titleSlug}`} state={blogId} className={`block space-y-1 w-fit`}>
            <h2 className={`font-bold w-fit text-xl`}>{title}</h2>
            <p className={`line-clamp-2 text-sm dark:text-gray-300 text-gray-700 font-medium`}>
                {description}
            </p>
            <p className={`text-xs dark:text-gray-400 text-gray-600 font-grm w-fit`}>{date} </p>
        </Link>
    </section>
}

const BlogLoader = () => {
    return <div className={`space-y-2`}>
        <Skeleton active={true} avatar={{
            className: `!h-8 !w-8 rounded-full`,
        }} title={{
            className: `!h-5 !my-0 max-w-[40%]`,
        }} paragraph={false} className={`flex items-center justify-center`}/>
        <Skeleton active={true} title={{
            className: `!h-7 !w-full max-w-[85%]`,
        }} paragraph={{
            className: `!text-red-200`
        }}/>
    </div>
}

export default RecentlySavedBlogs;
