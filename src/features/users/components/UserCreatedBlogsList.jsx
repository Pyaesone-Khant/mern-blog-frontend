import React from 'react';

// components
import {BlogsList} from "@/features/index.js";

// apis
import {useGetBlogByUserIdQuery} from "@/features/blogs/blogApi.js";

// hooks
import {useCurrentUser} from "@/hooks/useCurrentUser.js";

const UserCreatedBlogsList = () => {

    const {currentUser} = useCurrentUser();
    const {data: blogs, isLoading} = useGetBlogByUserIdQuery(currentUser?._id, {
        skip: !currentUser?._id
    })

    return <BlogsList blogs={blogs} title={"Your blogs"} loading={isLoading}/>
};

export default UserCreatedBlogsList;
