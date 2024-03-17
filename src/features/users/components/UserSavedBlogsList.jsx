import React from 'react';

// components
import {BlogsList} from "@/features/index.js";

// apis
import {useGetSavedBlogsQuery} from "@/features/users/UserApi.js";

// hooks
import {useCurrentUser} from "@/hooks/useCurrentUser.js";

const UserSavedBlogsList = () => {

    const {currentUser} = useCurrentUser();

    const {data: savedBlogs, isLoading} = useGetSavedBlogsQuery(currentUser?._id, {
        skip: !currentUser?._id
    });

    return <BlogsList blogs={savedBlogs} loading={isLoading} title={"Your saved list"}/>
};

export default UserSavedBlogsList;
