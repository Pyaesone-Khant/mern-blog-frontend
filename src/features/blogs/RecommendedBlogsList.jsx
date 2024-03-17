// icons
import {MdOutlineArrowForward} from "react-icons/md";

// components
import {Link} from "react-router-dom";
import {BlogsList} from "@/features/index.js";

// apis
import {useGetRecommendedBlogsQuery} from "@/features/blogs/blogApi.js";
import {useGetCategoryByIdQuery} from "@/features/categories/categoriesApi.js";

// hooks
import {useSlugChanger} from "@/hooks/useSlugChanger.js";

const RecommendedBlogsList = ({categoryId, blogId}) => {

    const {data: category, isLoading: isCLoading} = useGetCategoryByIdQuery(categoryId, {skip: !categoryId});
    const tagSlug = useSlugChanger(category?.title)

    const {data: recommendedBlogsData, isLoading: isBLoading} = useGetRecommendedBlogsQuery(categoryId);
    const recommendedBlogs = recommendedBlogsData?.filter(blog => blog?._id !== blogId).slice().sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)).slice(0, 2)

    const hasMore = recommendedBlogsData?.length > 2;

    return (
        <section className={`space-y-6`}>
            <BlogsList blogs={recommendedBlogs} title={`other blogs in ${category?.title}`}
                       loading={isCLoading || isBLoading}
                       isRecommended={true}/>

            {
                hasMore && <Link to={`/tag/${tagSlug}`}
                                 state={categoryId}
                                 className={`flex items-center gap-1 w-fit mx-auto text-sm text-cBlue dark:text-darkTer font-semibold border-b dark:border-darkTer border-cBlue`}>
                    See More <MdOutlineArrowForward/>
                </Link>
            }
        </section>
    )
}

export default RecommendedBlogsList;