import { Loader } from "@/components";
import {BlogsList, CatList, SearchBlogForm} from "@/features";
import {useGetAllBlogsQuery} from "@/features/blogs/blogApi";
import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApi";
import { useSelector } from "react-redux";
import {useState} from "react";

const Home = () => {
    const { itemsPerPage, currentPage } = useSelector((state) => state.blog);
    const { keyword } = useSelector((state) => state.category);
    const [searchedBlogs, setSearchedBlogs] = useState(null)

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
        <section className=" flex flex-col gap-5 w-full">
            <div className={`flex flex-col md:flex-row gap-5`} >
                {/*<SearchBlogForm setSearchedBlogs={setSearchedBlogs} />*/}
                <CatList categories={categories}/>
            </div>
            <BlogsList
                blogs={searchedBlogs ? searchedBlogs : blogs}
                totalBlogs={searchedBlogs ? searchedBlogs?.length : totalBlogs}
                isBFetching={isBFetching}
            />
        </section>
    );
};

export default Home;
