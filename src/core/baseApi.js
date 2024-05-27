import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_PROD_API_URL,
        prepareHeaders: (headers) => {
            const token = JSON.parse(localStorage.getItem("accessToken"));
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
                return headers;
            }
        },
    }),
    tagTypes: ["auth", "blog", "category", "comment", "user"],
    endpoints: () => ({}),
});
