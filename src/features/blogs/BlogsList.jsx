import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import BlogNotFound from "./BlogNotFound";
import { CPagination } from "@/components";

const BlogsList = ({
    blogs,
    currentPage,
    setCurrentPage,
    totalBlogs,
    itemsPerPage,
    setItemsPerPage,
}) => {
    const { keyword } = useSelector((state) => state.category);
    const [renderedBlogs, setRenderedBlogs] = useState([]);
    useEffect(() => {
        if (blogs) {
            if (keyword === "All") {
                setRenderedBlogs(blogs);
            } else {
                const filteredBlogs = blogs?.filter(
                    (item) => item.categoryId === keyword
                );
                setRenderedBlogs(filteredBlogs);
            }
        }
    }, [keyword, blogs]);

    const displayedBlogs = blogs?.length;

    return (
        <div className=" w-full h-full flex flex-col gap-5 items-center">
            {renderedBlogs?.length > 0 ? (
                renderedBlogs?.map((blog) => {
                    return <BlogCard key={blog._id} blog={blog} />;
                })
            ) : (
                <BlogNotFound />
            )}
            <CPagination
                totalBlogs={totalBlogs}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setItemsPerPage={setItemsPerPage}
                itemsPerPage={itemsPerPage}
                displayedBlogs={displayedBlogs}
            />
        </div>
    );
};

export default BlogsList;
