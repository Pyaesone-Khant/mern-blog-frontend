import React from 'react';
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import {useGetSavedBlogsQuery} from "@/features/users/UserApi.js";
import {BlogsList} from "@/features/index.js";

const UserSavedBlogsList = () => {

    const {currentUser} = useCurrentUser();

    const {data: savedBlogs, isLoading} = useGetSavedBlogsQuery(currentUser?._id, {
        skip: !currentUser?._id
    });

    return <BlogsList blogs={savedBlogs} loading={isLoading} title={"Your saved list"}/>
};

export default UserSavedBlogsList;
