import { Link } from "react-router-dom";
import { SaveBtn } from "@/components";

const BlogCardHeader = ({ isDetail, blog, blogCategory }) => {
    return (
        <div className="flex items-start justify-between">
            <div className="md:text-xl text-lg font-medium  duration-200 w-fit flex flex-col-reverse md:items-center gap-2 md:flex-row ">
                {isDetail ? (
                    <h2 className="capitalize"> {blog?.title} </h2>
                ) : (
                    <Link
                        to={`/blogs/${blog?._id}`}
                        className=" line-clamp-1 hover:text-blue-500 dark:hover:text-darkTer duration-200 capitalize "
                    >
                        {" "}
                        {blog?.title}{" "}
                    </Link>
                )}
                <span className="md:text-sm text-xs px-2 py-1 rounded-md bg-blue-600 dark:bg-darkTer text-white font-normal w-fit">
                    {" "}
                    {blogCategory?.title}{" "}
                </span>
            </div>
            <SaveBtn blogId={blog?._id} />
        </div>
    );
};

export default BlogCardHeader;
