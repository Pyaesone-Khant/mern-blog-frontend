import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://blogapp-apis.onrender.com/api",
        // baseUrl: "http://localhost:3500/api",
        prepareHeaders: ((headers) => {
            const token = JSON.parse(localStorage.getItem("accessToken"));
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                return headers;
            }
        })
    }),
    tagTypes: ["auth", "blog", "category", "comment", "user"],
    endpoints: () => ({}),
})