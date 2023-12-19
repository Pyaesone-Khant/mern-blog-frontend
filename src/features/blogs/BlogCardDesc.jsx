const BlogCardDesc = ({ isDetail, blog, changeRoute }) => {
    return (
        <div
            className={`text-darkBgSec dark:text-gray-300 capitalize leading-6`}
        >
            {isDetail ? (
                <p className={`whitespace-pre-line text-justify`} > {blog?.description} </p>
            ) : (
                <p onClick={changeRoute} className={`line-clamp-3 cursor-pointer text-sm
                `} > {blog?.description} </p>
            )}
        </div>
    );
};

export default BlogCardDesc;
