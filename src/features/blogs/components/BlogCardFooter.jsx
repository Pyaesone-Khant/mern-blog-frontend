import React from 'react';
import {Tag} from "antd";
import BlogActionsMenu from "@/features/blogs/components/BlogActionsMenu.jsx";
import {SaveBtn} from "@/components/index.js";
import {cn} from "@/utils.js";
import {useAuth} from "@/hooks/useAuth.js";
import {useSlugChanger} from "@/hooks/useSlugChanger.js";
import {Link} from "react-router-dom";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";

const BlogCardFooter = ({blogCategory, blog}) => {
    const {token} = useAuth();
    const {currentUser} = useCurrentUser();

    const isAuthor = currentUser?._id === blog?.userId;
    const tagSlug = useSlugChanger(blogCategory?.title);
    const blogSlug = useSlugChanger(blog?.title);

    return (
        <section className={cn("flex items-center justify-between w-full")}>
            <Link to={`/tag/${tagSlug}`} state={blogCategory?._id}>
                <Tag color="success"
                     className={`w-fit rounded-full hidden dark:block`}> {blogCategory?.title} </Tag>
                <Tag color="processing"
                     className={`w-fit rounded-full dark:hidden`}> {blogCategory?.title} </Tag>
            </Link>
            <div className={`flex items-center gap-2`}>
                {
                    (isAuthor ||
                        currentUser?.email === "admin123@gmail.com") && token ?
                        <BlogActionsMenu blogId={blog?._id} slug={blogSlug}/> : null
                }
                {
                    !isAuthor && token ? <SaveBtn blogId={blog?._id}/> : null
                }
            </div>
        </section>
    );
};

export default BlogCardFooter;
