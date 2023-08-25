import { Loader } from "@/components";
import { BlogsList, CatList } from "@/features";
import { useGetAllBlogsQuery } from "@/features/blogs/blogApi";
import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApi";
import { useState } from "react";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const { data: blogsData, isLoading: isBLoading } = useGetAllBlogsQuery({
        page: currentPage,
        size: itemsPerPage,
    });
    const { data: categoriesData, isLoading: isCLoading } =
        useGetAllCategoriesQuery();

    const blogs = blogsData?.data;
    const categories = categoriesData?.data;
    if (isBLoading || isCLoading) {
        return (
            <div
                className=" flex items-center justify-center w-full
            "
            >
                <Loader />{" "}
            </div>
        );
    }

    return (
        <section className=" flex flex-col md:flex-row md:items-start md:gap-10 w-full">
            <CatList categories={categories} />
            <BlogsList
                blogs={blogs}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalBlogs={blogsData?.totalBlogs}
                setItemsPerPage={setItemsPerPage}
                itemsPerPage={itemsPerPage}
            />
        </section>
    );
};

export default Home;
