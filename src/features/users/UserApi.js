import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    //baseQuery: fetchBaseQuery({
    //baseUrl: "https://blogapp-apis.onrender.com/users",
    //}),
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/users" }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["user"],
        }),

        updateUser: builder.mutation({
            query: (user) => ({
                url: `/`,
                method: "PUT",
                body: user,
            }),
            invalidatesTags: ["user"],
        }),

        deleteUser: builder.mutation({
            query: (userData) => ({
                url: `/`,
                method: "DELETE",
                body: userData,
            }),
            invalidatesTags: ["user"],
        }),

        getUserById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),

        changeUserPassword: builder.mutation({
            query: (passwords) => ({
                url: "/change_password",
                method: "PUT",
                body: passwords,
            }),
            invalidatesTags: ["user"],
        }),

        saveBlogs: builder.mutation({
            query: ({ userId, blogId }) => ({
                url: `/save_blogs/${userId}`,
                method: "POST",
                body: { blogId },
            }),
            invalidatesTags: ["user"],
        }),

        getSavedBlogs: builder.query({
            query: (userId) => ({
                url: `/save_blogs/${userId}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useChangeUserPasswordMutation,
    useSaveBlogsMutation,
    useGetSavedBlogsQuery,
} = userApi;
