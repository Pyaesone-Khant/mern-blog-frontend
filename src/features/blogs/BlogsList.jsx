import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

const BlogsList = ({ blogs }) => {
    const { keyword, title } = useSelector((state) => state.category);
    const [renderedBlogs, setRenderedBlogs] = useState([]);
    //testing pagination
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const subsetPages = blogs?.slice(startIndex, endIndex);
        setRenderedBlogs(subsetPages);
    };
    return (
        <div className=" w-full h-full flex flex-col gap-5 items-center">
            {renderedBlogs?.length > 0 ? (
                renderedBlogs?.map((blog) => {
                    return <BlogCard key={blog._id} blog={blog} />;
                })
            ) : (
                <h2 className="text-2xl font-semibold text-center p-5 rounded-md bg-white w-full">
                    There is no blogs with the category title {`"${title}"`} in
                    this page!
                </h2>
            )}
            <Pagination
                className="mt-auto"
                defaultCurrent={currentPage}
                current={currentPage}
                total={blogs?.length}
                onChange={handlePageChange}
                pageSize={itemsPerPage}
            />
        </div>
    );
};

export default BlogsList;
