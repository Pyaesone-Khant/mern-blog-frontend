import { BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = JSON.parse(localStorage.getItem("accessToken"));
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
                return headers;
            }
        },
    }),
    tagTypes: ["auth", "blog", "category", "comment", "user", "messages", "conversations"],
    endpoints: () => ({}),
});
