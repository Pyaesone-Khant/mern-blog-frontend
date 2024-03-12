import {useGetRecommendedBlogsQuery} from "@/features/blogs/blogApi.js";
import {Link} from "react-router-dom";
import {useGetCategoryByIdQuery} from "@/features/categories/categoriesApi.js";
import {useSlugChanger} from "@/hooks/useSlugChanger.js";
import {BlogsList} from "@/features/index.js";
import {MdOutlineArrowForward} from "react-icons/md";
import React from "react";

const RecommendedBlogsList = ({categoryId, blogId}) => {

    const {data: category, isLoading} = useGetCategoryByIdQuery(categoryId, {skip: !categoryId});
    const tagSlug = useSlugChanger(category?.title)

    const {data: recommendedBlogsData} = useGetRecommendedBlogsQuery(categoryId);
    const recommendedBlogs = recommendedBlogsData?.filter(blog => blog?._id !== blogId).slice().sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)).slice(0, 2)

    const hasMore = recommendedBlogsData?.length > 2;

    return (
        <section className={`space-y-6`}>
            <BlogsList blogs={recommendedBlogs} title={`other blogs in ${category?.title}`} loading={isLoading}
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