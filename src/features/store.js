import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categoriesSlice from "./categories/categoriesSlice";
import blogSlice from "./blogs/blogSlice";
import globalSlice from "@/core/globalSlice";
import commentSlice from "@/features/comments/commentSlice.js";
import {baseApi} from "@/core/baseApi.js";

export const store = configureStore({
    reducer: {
        global: globalSlice,
        auth: authSlice,
        category: categoriesSlice,
        blog: blogSlice,
        comment: commentSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(
            baseApi.middleware,
        ),
});
