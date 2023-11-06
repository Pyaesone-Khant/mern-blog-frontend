import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath : "baseApi",
    baseQuery : fetchBaseQuery({baseUrl : "https://blogapp-apis.onrender.com"}),
    tagTypes: ["auth", "blog", "category", "comment", "user"],
    endpoints: () => ({}),
})