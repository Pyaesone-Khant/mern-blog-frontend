import { Link } from "react-router-dom";

const BlogCardDesc = ({ isDetail, blog }) => {
    return (
        <div
            className={`text-gray-500 dark:text-gray-400 capitalize text-sm`}
        >
            {isDetail ? (
                <p className={`whitespace-pre-line text-justify`} > {blog?.description} </p>
            ) : (
                <Link to={`/blogs/${blog?._id}`} className={`line-clamp-3`} > {blog?.description} </Link>
            )}
        </div>
    );
};

export default BlogCardDesc;
