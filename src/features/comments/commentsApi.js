import {baseApi} from "@/core/baseApi.js";

const endPoint = "/comments"

export const commentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllComments: builder.query({
            query: (blogId) => ({
                url: `${endPoint}?blogId=${blogId}`,
                method: "GET",
            }),
            providesTags: ["comment"],
        }),

        createComment: builder.mutation({
            query: (commentData) => ({
                url: `${endPoint}`,
                method: "POST",
                body: commentData,
            }),
            invalidatesTags: ["comment"],
        }),

        updateComment: builder.mutation({
            query: (commentData) => ({
                url: `${endPoint}`,
                method: "PUT",
                body: commentData,
            }),
            invalidatesTags: ["comment"],
        }),

        deleteComment: builder.mutation({
            query: (id) => ({
                url: `${endPoint}`,
                method: "DELETE",
                body: {id},
            }),
            invalidatesTags: ["comment"],
        }),

        getCommentById: builder.query({
            query: (id) => ({
                url: `${endPoint}/${id}`,
                method: "GET",
            }),
            providesTags: ["comment"],
        }),

        getCommentsByBlogId: builder.query({
            query: (blogId) => ({
                url: `${endPoint}?blogId=${blogId}`,
                method: "GET",
            }),
            providesTags: ["comment"],
        }),
    }),
});

export const {
    useGetAllCommentsQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useGetCommentByIdQuery,
    useGetCommentsByBlogIdQuery
} = commentsApi;
