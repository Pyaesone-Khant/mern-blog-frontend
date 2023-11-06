import {baseApi} from "@/core/baseApi.js";

const endPoint = "/users";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: `${endPoint}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),

        updateUser: builder.mutation({
            query: (user) => ({
                url: `${endPoint}`,
                method: "PUT",
                body: user,
            }),
            invalidatesTags: ["user"],
        }),

        deleteUser: builder.mutation({
            query: (userData) => ({
                url: `${endPoint}`,
                method: "DELETE",
                body: userData,
            }),
            invalidatesTags: ["user"],
        }),

        getUserById: builder.query({
            query: (id) => ({
                url: `${endPoint}/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),

        changeUserPassword: builder.mutation({
            query: (passwords) => ({
                url: `${endPoint}/change_password`,
                method: "PUT",
                body: passwords,
            }),
            invalidatesTags: ["user"],
        }),

        saveBlogs: builder.mutation({
            query: ({ userId, blogId }) => ({
                url: `${endPoint}/save_blogs/${userId}`,
                method: "POST",
                body: { blogId },
            }),
            invalidatesTags: ["user"],
        }),

        getSavedBlogs: builder.query({
            query: (userId) => ({
                url: `${endPoint}/save_blogs/${userId}`,
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
