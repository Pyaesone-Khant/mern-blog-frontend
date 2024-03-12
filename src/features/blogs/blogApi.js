import {baseApi} from "@/core/baseApi.js";

const endPoint = "/blogs"

export const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: ({page, size}) => ({
                url: `${endPoint}?page=${page}&size=${size}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

        createBlog: builder.mutation({
            query: (blog) => ({
                url: `${endPoint}`,
                method: "POST",
                body: blog,
            }),
            invalidatesTags: ["blog"],
        }),

        updateBlog: builder.mutation({
            query: (blog) => ({
                url: `${endPoint}`,
                method: "PUT",
                body: blog,
            }),
            invalidatesTags: ["blog"],
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `${endPoint}`,
                method: "DELETE",
                body: {id},
            }),
            invalidatesTags: ["blog"],
        }),

        getBlogById: builder.query({
            query: (id) => ({
                url: `${endPoint}/${id}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

        setUserReaction: builder.mutation({
            query: (ids) => ({
                url: `${endPoint}/reactions`,
                method: "POST",
                body: ids,
            }),
            invalidatesTags: ["blog"],
        }),

        getBlogByUserId: builder.query({
            query: (userId) => ({
                url: `${endPoint}/user-blogs/${userId}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

        getSearchedBlogs: builder.query({
            query: (search) => ({
                url: `${endPoint}/search?q=${search}`,
                method: "GET",
            }),
            providesTags: ["blog"]
        }),

        getRecommendedBlogs: builder.query({
            query: (categoryId) => ({
                url: `${endPoint}/recommendedBlogs/${categoryId}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

        getRandomBlogs: builder.query({
            query: () => ({
                url: `${endPoint}/random`,
                method: "GET",
            }),
            providesTags: ["blog"],
        })
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
    useGetSearchedBlogsQuery,
    useGetRecommendedBlogsQuery,
    useGetRandomBlogsQuery
} = blogApi;
