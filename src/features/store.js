import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categoriesSlice from "./categories/categoriesSlice";
import blogSlice from "./blogs/blogSlice";
import globalSlice from "@/core/globalSlice";
import {baseApi} from "@/core/baseApi.js";
import commentSlice from "@/features/comments/commentSlice.js";

export const store = configureStore({
    reducer: {
        global : globalSlice,
        [baseApi.reducerPath] : baseApi.reducer,
        auth: authSlice,
        category: categoriesSlice,
        blog: blogSlice,
        comment: commentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck : false}).concat(
            baseApi.middleware,
        ),
});
