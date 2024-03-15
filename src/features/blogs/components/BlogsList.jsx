import { Loader } from "@/components/index.js";
import BlogCard from "@/features/blogs/components/BlogCard.jsx";
import { cn } from "@/utils.js";

const UserSavedBlogsList = ({ title = null, blogs = [], loading, isRecommended = false }) => {

    if (loading) return <Loader />

    return (
        <section className={cn(`mx-auto w-full`, { "max-w-6xl": isRecommended })}>
            {title && <h2 className={`md:text-2xl text-xl text-cBlue dark:text-darkTer font-bold capitalize mb-5`}>{title}</h2>}

            {blogs?.length ? <div
                className={cn(`mt-10`, {
                    "grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 mt-5": isRecommended,
                    "space-y-6 mt-2": !isRecommended
                })}>
                {
                    blogs?.map(blog => <BlogCard key={blog?._id} blog={blog} isRecommended={isRecommended} />)
                }
            </div> : <p className={`p-20 text-center text-gray-600 dark:text-gray-400`}>
                No blog found!
            </p>}

        </section>
    );
};

export default UserSavedBlogsList;
