import {baseApi} from "@/core/baseApi.js";

const endPoint = "/auth"

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerAccount: builder.mutation({
            query: (user) => ({
                url: `${endPoint}/register`,
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["auth"],
        }),

        loginAccount: builder.mutation({
            query: (userData) => ({
                url: `${endPoint}/login`,
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth", "user"],
        }),

        forgotPassword : builder.mutation({
            query : (email) => ({
                url : `${endPoint}/forgot-password`,
                method : "POST",
                body : email,
            }),
            invalidatesTags : ["auth"],
        }),

        resetPassword : builder.mutation({
            query : (updatedData) => ({
                url : `${endPoint}/reset-password`,
                method : "POST",
                body : updatedData,
            }),
            invalidatesTags : ["auth"],
        }),

        verifyOTP : builder.mutation({
            query : (userData) => ({
                url : `${endPoint}/verify-otp`,
                method : "POST",
                body : userData,
            }),
            invalidatesTags : ["auth"],
        }),

        resendOTP : builder.mutation({
            query : (email) => ({
                url : `${endPoint}/resend-otp`,
                method : "POST",
                body : email,
            }),
            invalidatesTags : ["auth"]
        }),

        logoutAccount: builder.mutation({
            query: (token) => ({
                url: `${endPoint}/logout`,
                method: "POST",
                body: { token },
            }),
            invalidatesTags: ["auth"],
        }),

        getRefreshToken: builder.query({
            query: () => ({
                url: `${endPoint}/refresh-token`,
                method: "GET",
            }),
            providesTags: ["auth"],
        })
    }),
});

export const {
    useLoginAccountMutation,
    useLogoutAccountMutation,
    useRegisterAccountMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyOTPMutation,
    useResendOTPMutation,
    useGetRefreshTokenQuery,
} = authApi;
