import {BLWithPagination, CatList, RSavedBlogs} from "@/features";
import {useGetAllBlogsQuery} from "@/features/blogs/blogApi";
import {useGetAllCategoriesQuery} from "@/features/categories/categoriesApi";
import {useSelector} from "react-redux";
import {useResponsive} from "@/hooks/useResponsive.js";
import {Loader} from "@/components/index.js";

const Home = () => {
    const {itemsPerPage, currentPage} = useSelector((state) => state.blog);
    const {isMediumDevice} = useResponsive();

    const {
        data: blogsData,
        isLoading: isBLoading,
        isFetching: isBFetching,
    } = useGetAllBlogsQuery({
        page: currentPage,
        size: itemsPerPage,
    });
    const {data: categories, isLoading: isCLoading} =
        useGetAllCategoriesQuery();

    const blogs = blogsData?.data;
    const totalBlogs = blogsData?.totalBlogs;

    if (isBLoading || isCLoading) return <Loader/>;

    return (
        <section className=" flex flex-col w-full gap-6 md:gap-4 max-w-7xl mx-auto">
            <div className={`flex flex-col md:flex-row gap-5`}>
                {/*<SearchBlogForm setSearchedBlogs={setSearchedBlogs} />*/}
                <CatList categories={categories}/>
            </div>
            <div className={`flex flex-1 md:items-stretch lg:gap-10 gap-5 justify-between`}>
                <BLWithPagination
                    blogs={blogs}
                    totalBlogs={totalBlogs}
                    loading={isBFetching || isBLoading}
                />
                {!isMediumDevice &&
                    <div className={`w-[1px] self-stretch border-l border-black/20 dark:border-white/20`}></div>}
                {!isMediumDevice && <RSavedBlogs/>}
            </div>
        </section>
    );
};

export default Home;
