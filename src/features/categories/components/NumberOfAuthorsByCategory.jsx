import React from 'react';
import {useGetBlogsByCategoryQuery} from "@/features/categories/categoriesApi.js";

const NumberOfBlogsByCategory = ({categoryId}) => {

    const {data: blogs, isLoading} = useGetBlogsByCategoryQuery(categoryId)

    const numberOfAuthors = blogs?.map(blog => blog?.userId).filter((value, index, self) => self.indexOf(value) === index).length;

    return <p className={`font-semibold text-center`}> {isLoading ? 0 : numberOfAuthors} </p>
};

export default NumberOfBlogsByCategory;
