import { Link } from "react-router-dom";

const BlogCardDesc = ({ isDetail, blog }) => {
    return (
        <div
            className={`text-gray-500 dark:text-gray-400 capitalize text-[15px] py-1 min-h-min ${
                isDetail ? " whitespace-pre-line text-justify " : "line-clamp-2"
            }  `}
        >
            {isDetail ? (
                <p> {blog?.description} </p>
            ) : (
                <Link to={`/blogs/${blog?._id}`}> {blog?.description} </Link>
            )}
        </div>
    );
};

export default BlogCardDesc;
