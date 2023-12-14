import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath : "baseApi",
    baseQuery : fetchBaseQuery({
        // baseUrl : "https://blogapp-apis.onrender.com"
        baseUrl : "http://localhost:3500/api",
        prepareHeaders: ((headers,{getState}) => {
            const token = getState().auth.token;
            if(token){
                headers.set('Authorization',`Bearer ${token}`)
                return  headers;
            }
        })
    }),
    tagTypes: ["auth", "blog", "category", "comment", "user"],
    endpoints: () => ({}),
})