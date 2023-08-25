import BlogCard from "./BlogCard";
import BlogNotFound from "./BlogNotFound";
import { CPagination } from "@/components";

const BlogsList = ({ blogs, totalBlogs, isBFetching }) => {
    const displayedBlogs = blogs?.length;

    return (
        <div className=" w-full h-full flex flex-col gap-5 items-center">
            {blogs?.length > 0 ? (
                blogs?.map((blog) => {
                    return (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            isBFetching={isBFetching}
                        />
                    );
                })
            ) : (
                <BlogNotFound />
            )}
            <CPagination
                totalBlogs={totalBlogs}
                displayedBlogs={displayedBlogs}
            />
        </div>
    );
};

export default BlogsList;
