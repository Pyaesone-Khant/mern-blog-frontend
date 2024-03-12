import React from 'react';
import {useSearchParams} from "react-router-dom";
import {useGetSearchedBlogsQuery} from "@/features/blogs/blogApi.js";
import {BlogsList} from "@/features/index.js";

const SearchedResult = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q")

    const {data: searchedBlogs, isLoading, isFetching} = useGetSearchedBlogsQuery(query, {
        skip: !query,
    });

    return <BlogsList blogs={searchedBlogs} loading={isLoading} title={`Blogs resulted by "${query}"`}/>
};

export default SearchedResult;
