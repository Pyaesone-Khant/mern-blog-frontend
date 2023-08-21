import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://blogapp-apis.onrender.com/categories" }),
    tagTypes: ["category"],
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["category"],
        }),

        createCategory: builder.mutation({
            query: (category) => ({
                url: "/",
                method: "POST",
                body: category,
            }),
            invalidatesTags: ["category"],
        }),

        updateCategory: builder.mutation({
            query: (category) => ({
                url: `/`,
                method: "PUT",
                body: category,
            }),
            invalidatesTags: ["category"],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["category"],
        }),

        getCategoryById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["category"],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryByIdQuery,
} = categoriesApi;
