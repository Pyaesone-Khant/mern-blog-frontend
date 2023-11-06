import {baseApi} from "@/core/baseApi.js";

const endPonint = "/blogs"

export const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: ({ page, size, categoryId }) => ({
                url: `${endPonint}?page=${page}&size=${size}&cId=${categoryId}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

        createBlog: builder.mutation({
            query: (blog) => ({
                url: `${endPonint}`,
                method: "POST",
                body: blog,
            }),
            invalidatesTags: ["blog"],
        }),

        updateBlog: builder.mutation({
            query: (blog) => ({
                url: `${endPonint}`,
                method: "PUT",
                body: blog,
            }),
            invalidatesTags: ["blog"],
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `${endPonint}`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["blog"],
        }),

        getBlogById: builder.query({
            query: (id) => ({
                url: `${endPonint}/${id}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

        setUserReaction: builder.mutation({
            query: (ids) => ({
                url: `${endPonint}/reactions`,
                method: "POST",
                body: ids,
            }),
            invalidatesTags: ["blog"],
        }),

        getBlogByUserId: builder.query({
            query: (userId) => ({
                url: `${endPonint}/getUserBlogs/${userId}`,
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
