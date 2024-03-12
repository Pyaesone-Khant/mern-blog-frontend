import {cn} from "@/utils.js";

const BlogCardHeader = ({ isDetail, blog, changeRoute }) => {

    return <h2 onClick={isDetail ? null : changeRoute} className={cn(`capitalize font-bold text-lg md:text-xl w-fit`, {"cursor-pointer" : !isDetail, "text-3xl" : isDetail})} > {blog?.title} </h2>;
};

export default BlogCardHeader;
