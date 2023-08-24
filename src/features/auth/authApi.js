import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://blogapp-apis.onrender.com" }),
    //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),

    tagTypes: ["auth"],
    endpoints: (builder) => ({
        registerAccount: builder.mutation({
            query: (user) => ({
                url: "/register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["auth"],
        }),

        loginAccount: builder.mutation({
            query: (userData) => ({
                url: "/login",
                method: "POST",
                body: userData,
            }),
            //invalidatesTags: ["auth"],
        }),

        logoutAccount: builder.mutation({
            query: (token) => ({
                url: "/logout",
                method: "POST",
                body: { token },
            }),
            //invalidatesTags: ["auth"],
        }),
    }),
});

export const {
    useLoginAccountMutation,
    useLogoutAccountMutation,
    useRegisterAccountMutation,
} = authApi;
