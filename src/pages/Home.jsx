import { Loader } from "@/components";
import { BlogsList, CatList } from "@/features";
import { useGetAllBlogsQuery } from "@/features/blogs/blogApi";
import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApi";

const Home = () => {
    const { data: blogsData, isLoading: isBLoading } = useGetAllBlogsQuery();
    const { data: categoriesData, isLoading: isCLoading } =
        useGetAllCategoriesQuery();

    const blogs = blogsData?.data
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
            <BlogsList blogs={blogs} />
        </section>
    );
};

export default Home;
