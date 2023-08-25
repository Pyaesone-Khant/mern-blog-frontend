import { Link } from "react-router-dom";

const BlogCardDesc = ({ isDetail, blog }) => {
    return (
        <div
            className={`text-gray-500 dark:text-gray-400 ${
                isDetail ? " whitespace-pre-line" : "line-clamp-2"
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
