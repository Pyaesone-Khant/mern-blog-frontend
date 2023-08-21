import { useSelector } from "react-redux";
import { Loader } from "../../components";
import BlogCard from "./BlogCard";
import { useGetAllBlogsQuery } from "./blogApi";
import { useEffect, useState } from "react";
import CategoriesList from "../categories/CategoriesList";
import { useGetAllCategoriesQuery } from "../categories/categoriesApi";

const BlogsList = () => {
    const { data: blogData, isLoading: isBLoading } = useGetAllBlogsQuery();

    const { data: catData, isLoading: isCLoading } = useGetAllCategoriesQuery();

    const { keyword, title } = useSelector((state) => state.category);

    const blogs = blogData?.data
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const [renderedBlogs, setRenderedBlogs] = useState(blogs);

    useEffect(() => {
        if (keyword === "All") {
            setRenderedBlogs(blogs);
        } else {
            const filteredBlogs = blogs?.filter(
                (item) => item.categoryId === keyword
            );
            setRenderedBlogs(filteredBlogs);
        }
    }, [keyword, blogData]);

    if (isBLoading || isCLoading) {
        return (
            <div
                className=" h-full flex items-center justify-center w-full
            "
            >
                <Loader />{" "}
            </div>
        );
    }
    return (
        <section className=" flex flex-col md:flex-row md:items-start md:gap-10 ">
            <CategoriesList categories={catData?.data} />
            <div className=" w-full flex gap-5 flex-wrap justify-center h-full">
                {renderedBlogs?.length > 0 ? (
                    renderedBlogs?.map((blog) => {
                        return <BlogCard key={blog._id} blog={blog} />;
                    })
                ) : (
                    <h2 className="text-2xl font-semibold self-center text-center p-5 rounded-md bg-white w-full shadow">
                        There is no blogs with the category {`"${title}"`} for
                        now!
                    </h2>
                )}
            </div>
        </section>
    );
};

export default BlogsList;
