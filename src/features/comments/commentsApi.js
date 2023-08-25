import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
    reducerPath: "commentsApi",
    //baseQuery: fetchBaseQuery({
    //    baseUrl: "https://blogapp-apis.onrender.com/comments",
    //}),

    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/comments" }),
    tagTypes: ["comment"],
    endpoints: (builder) => ({
        getAllComments: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["comment"],
        }),

        createComment: builder.mutation({
            query: (commentData) => ({
                url: "/",
                method: "POST",
                body: commentData,
            }),
            invalidatesTags: ["comment"],
        }),

        updateComment: builder.mutation({
            query: (commentData) => ({
                url: `/`,
                method: "PUT",
                body: commentData,
            }),
            invalidatesTags: ["comment"],
        }),

        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["comment"],
        }),

        getCommentById: builder.query({
            query: (id) => ({
                url: `/${id}`,
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
} = commentsApi;
