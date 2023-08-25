import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://blogapp-apis.onrender.com/blogs",
    }),
    //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/blogs" }),
    tagTypes: ["blog"],
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: ({ page, size, categoryId }) => ({
                url: `?page=${page}&size=${size}&cId=${categoryId}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

        createBlog: builder.mutation({
            query: (blog) => ({
                url: "/",
                method: "POST",
                body: blog,
            }),
            invalidatesTags: ["blog"],
        }),

        updateBlog: builder.mutation({
            query: (blog) => ({
                url: `/`,
                method: "PUT",
                body: blog,
            }),
            invalidatesTags: ["blog"],
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["blog"],
        }),

        getBlogById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

        setUserReaction: builder.mutation({
            query: (ids) => ({
                url: "/reactions",
                method: "POST",
                body: ids,
            }),
            invalidatesTags: ["blog"],
        }),

        getBlogByUserId: builder.query({
            query: (userId) => ({
                url: `/getUserBlogs/${userId}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),
    }),
});

export const {
    useGetAllBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useGetBlogByIdQuery,
    useSetUserReactionMutation,
    useGetBlogByUserIdQuery,
} = blogApi;
