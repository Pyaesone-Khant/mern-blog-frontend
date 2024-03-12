import React from 'react';
import {BlogsList} from "@/features/index.js";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import {useGetBlogByUserIdQuery} from "@/features/blogs/blogApi.js";

const UserCreatedBlogsList = () => {

    const {currentUser} = useCurrentUser();
    const {data: blogs, isLoading} = useGetBlogByUserIdQuery(currentUser?._id, {
        skip: !currentUser?._id
    })

    return <BlogsList blogs={blogs} title={"Your blogs"} loading={isLoading}/>
};

export default UserCreatedBlogsList;
