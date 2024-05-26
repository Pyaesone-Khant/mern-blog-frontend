import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// components
import { Loader } from "@/components/index.js";
import BlogCard from "@/features/blogs/components/BlogCard.jsx";
import { CatList } from "@/features/index.js";

// apis
import {
    useGetAllCategoriesQuery,
    useGetBlogsByCategoryQuery,
    useGetCategoryByIdQuery,
} from "@/features/categories/categoriesApi.js";

const BlogsListByCategory = () => {
    const categoryId = useLocation()?.state;
    const { data: blogs, isLoading: isBLoading } = useGetBlogsByCategoryQuery(
        categoryId,
        { skip: !categoryId }
    );
    const { data: category, isLoading: isCLoading } = useGetCategoryByIdQuery(
        categoryId,
        { skip: !categoryId }
    );
    const { data: categories, isLoading: isCsLoading } =
        useGetAllCategoriesQuery();

    const authorCount = blogs
        ?.map((blog) => blog?.userId)
        .filter((value, index, self) => self.indexOf(value) === index).length;

    useEffect(() => {
        if (category) {
            document.title = `Writee | ${category?.title}`;
        }

        return () => {
            document.title = "Writee";
        };
    }, [category]);

    if (isBLoading || isCLoading || isCsLoading) return <Loader />;

    return (
        <section className={`md:max-w-5xl mx-auto w-full space-y-4`}>
            <CatList categories={categories} />
            <div className={` w-full space-y-6`}>
                <div
                    className={`text-center space-y-1 border-b border-black/20 dark:border-white/20 pb-6`}
                >
                    <h2 className={`text-4xl font-bold`}>
                        {category?.title || "Tag Title"}
                    </h2>
                    <div className={`flex items-center justify-center gap-3 `}>
                        <Counter count={authorCount} title={"authors"} />
                        <span
                            className={`w-1 h-1 rounded-full block dark:bg-gray-300 bg-black`}
                        ></span>
                        <Counter count={blogs?.length} title={"blogs"} />
                    </div>
                </div>

                {blogs?.length ? (
                    <div
                        className={`grid gird-cols-1 md:grid-cols-2 md:gap-10 gap-5`}
                    >
                        {blogs?.map((blog) => (
                            <BlogCard
                                key={blog?._id}
                                blog={blog}
                                isRecommended={true}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className={`text-center py-10 px-5`}>
                            There is no blog available in this category!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

const Counter = ({ count = 0, title = "" }) => {
    return (
        <p className={`text-sm capitalize text-black dark:text-gray-300`}>
            <span className={`text-lg font-medium dark:text-white`}>
                {count}
            </span>{" "}
            {title}
        </p>
    );
};

export default BlogsListByCategory;
