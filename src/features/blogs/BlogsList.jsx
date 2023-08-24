import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import BlogNotFound from "./BlogNotFound";
import { CPagination } from "@/components";

const BlogsList = ({ blogs }) => {
    const { keyword } = useSelector((state) => state.category);
    const [renderedBlogs, setRenderedBlogs] = useState([]);

    //pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    //pagination end

    useEffect(() => {
        if (blogs) {
            const subPages = blogs?.slice(startIndex, endIndex);
            if (keyword === "All") {
                setRenderedBlogs(subPages);
            } else {
                const filteredBlogs = subPages?.filter(
                    (item) => item.categoryId === keyword
                );
                setRenderedBlogs(filteredBlogs);
            }
        }
    }, [keyword, blogs, currentPage]);

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
                blogs={blogs}
                setRenderedBlogs={setRenderedBlogs}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
            />
        </div>
    );
};

export default BlogsList;
