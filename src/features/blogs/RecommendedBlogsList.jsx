import BlogCard from "@/features/blogs/BlogCard.jsx";
import {useGetRecommendedBlogsQuery} from "@/features/blogs/blogApi.js";

const RecommendedBlogsList = ({categoryId, blogId}) => {

    const {data : recommendedBlogsData} = useGetRecommendedBlogsQuery(categoryId);

    const recommendedBlogs = recommendedBlogsData?.data?.filter(blog => blog?._id !== blogId)

    return (
        <section className={`mt-5 max-w-2xl mx-auto overflow-hidden rBlogs `} >
            <h2 className={`text-xl font-bold text-darkBg dark:text-gray-300 mb-3`} > Recommended Blogs </h2>
            {
                recommendedBlogs?.length ? <div className={`inline-grid grid-rows-1 grid-flow-col gap-5 overflow-x-scroll w-full pb-3 rounded-md `} >
                    {
                        recommendedBlogs?.map(blog => <BlogCard blog={blog} key={blog?._id} isRecommended={true} />)
                    }
                </div> : <p className={`text-center text-darkBg dark:text-gray-300 p-4 rounded-md bg-cBlue/10 dark:bg-darkTer/10`} > No recommended blogs found! </p>
            }
        </section>
    )
}

export default RecommendedBlogsList;