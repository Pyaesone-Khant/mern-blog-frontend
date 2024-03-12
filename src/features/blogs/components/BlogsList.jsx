import React from 'react';
import BlogCard from "@/features/blogs/components/BlogCard.jsx";
import {Loader} from "@/components/index.js";
import {cn} from "@/utils.js";

const UserSavedBlogsList = ({title = "", blogs = [], loading, isRecommended = false}) => {

    if (loading) return <Loader/>

    return (
        <section className={`max-w-6xl mx-auto w-full`}>
            <h2 className={`md:text-2xl text-xl text-cBlue dark:text-darkTer font-bold capitalize`}>{title}</h2>

            {blogs?.length ? <div
                className={cn(`mt-10`, {
                    "grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 mt-5": isRecommended,
                    "space-y-6": !isRecommended
                })}>
                {
                    blogs?.map(blog => <BlogCard key={blog?._id} blog={blog} isRecommended={isRecommended}/>)
                }
            </div> : <p className={`p-20 text-center text-gray-600 dark:text-gray-400`}>
                No blogs found!
            </p>}

        </section>
    );
};

export default UserSavedBlogsList;
