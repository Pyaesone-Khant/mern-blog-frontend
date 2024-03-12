import React from 'react';
import {useGetBlogsByCategoryQuery} from "@/features/categories/categoriesApi.js";

const NumberOfBlogsByCategory = ({categoryId}) => {

    const {data: blogs, isLoading} = useGetBlogsByCategoryQuery(categoryId)

    const numberOfBlogs = blogs?.length

    return <p className={`font-semibold text-center`}> {isLoading ? 0 : numberOfBlogs} </p>
};

export default NumberOfBlogsByCategory;
