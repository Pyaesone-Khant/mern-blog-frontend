import React from 'react';

// icons
import {MdOutlineArrowForward} from "react-icons/md";

// components
import {BlogsList} from "@/features/index.js";

// hooks
import {useSlugChanger} from "@/hooks/useSlugChanger.js";

// apis
import {useGetUserByIdQuery} from "@/features/users/UserApi.js";
import {useGetBlogByUserIdQuery} from "@/features/blogs/blogApi.js";

// third-party
import {Link} from "react-router-dom";

const BlogsByAuthor = ({authorId, blogId}) => {

    const {data: blogsData, isLoading: isBLoading} = useGetBlogByUserIdQuery(authorId);
    const blogs = blogsData?.filter(blog => blog?._id !== blogId).slice().sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)).slice(0, 2);

    const {data: author, isLoading: isALoading} = useGetUserByIdQuery(authorId);
    const nameSlug = useSlugChanger(author?.name);
    const hasMore = blogsData?.length > 2;

    return <section className={`w-full space-y-6`}>
        <BlogsList blogs={blogs} loading={isBLoading} title={`other blogs by ${author?.name}`} isRecommended={true}/>
        {
            hasMore &&
            <Link to={`/users/${nameSlug}`}
                  state={authorId}
                  className={`flex items-center gap-1 w-fit mx-auto text-sm text-cBlue dark:text-darkTer font-semibold border-b dark:border-darkTer border-cBlue`}>
                See More <MdOutlineArrowForward/>
            </Link>
        }
    </section>
};

export default BlogsByAuthor;
