import {baseApi} from "@/core/baseApi.js";

const endPoint = "/"

export const authApi = baseApi.injectEndpoints({
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
            invalidatesTags: ["auth"],
        }),

        logoutAccount: builder.mutation({
            query: (token) => ({
                url: "/logout",
                method: "POST",
                body: { token },
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const {
    useLoginAccountMutation,
    useLogoutAccountMutation,
    useRegisterAccountMutation,
} = authApi;
