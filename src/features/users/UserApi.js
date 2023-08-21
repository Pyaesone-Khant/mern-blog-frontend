import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
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
            query: (id) => ({
                url: `/`,
                method: "DELETE",
                body: id,
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
    }),
});

export const {
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useChangeUserPasswordMutation,
} = userApi;
