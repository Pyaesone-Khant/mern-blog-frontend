import { Loader } from "@/components";
import {BlogsList, CatList} from "@/features";
import {useGetAllBlogsQuery} from "@/features/blogs/blogApi";
import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApi";
import { useSelector } from "react-redux";

const Home = () => {
    const { itemsPerPage, currentPage } = useSelector((state) => state.blog);
    const { keyword } = useSelector((state) => state.category);

    const {
        data: blogsData,
        isLoading: isBLoading,
        isFetching: isBFetching,
    } = useGetAllBlogsQuery({
        page: currentPage,
        size: itemsPerPage,
        categoryId: keyword,
    });
    const { data: categoriesData, isLoading: isCLoading } =
        useGetAllCategoriesQuery();

    const blogs = blogsData?.data;
    const categories = categoriesData?.data;
    const totalBlogs = blogsData?.totalBlogs;

    if (isBLoading || isCLoading || isBFetching) {
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
        <section className=" flex flex-col gap-5 w-full">
            <div className={`flex flex-col md:flex-row gap-5`} >
                {/*<SearchBlogForm setSearchedBlogs={setSearchedBlogs} />*/}
                <CatList categories={categories}/>
            </div>
            <BlogsList
                blogs={blogs}
                totalBlogs={totalBlogs}
                isBFetching={isBFetching}
            />
        </section>
    );
};

export default Home;
