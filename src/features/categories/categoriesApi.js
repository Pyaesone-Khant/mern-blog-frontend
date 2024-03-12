import {baseApi} from "@/core/baseApi.js";

const endPonint = "/categories"


export const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: `${endPonint}`,
                method: "GET",
            }),
            providesTags: ["category"],
        }),

        createCategory: builder.mutation({
            query: (category) => ({
                url: `${endPonint}`,
                method: "POST",
                body: category,
            }),
            invalidatesTags: ["category"],
        }),

        updateCategory: builder.mutation({
            query: (category) => ({
                url: `${endPonint}`,
                method: "PUT",
                body: category,
            }),
            invalidatesTags: ["category"],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${endPonint}`,
                method: "DELETE",
                body: {id},
            }),
            invalidatesTags: ["category"],
        }),

        getCategoryById: builder.query({
            query: (id) => ({
                url: `${endPonint}/${id}`,
                method: "GET",
            }),
            providesTags: ["category"],
        }),

        getBlogsByCategory: builder.query({
            query: (categoryId) => ({
                url: `${endPonint}/${categoryId}/blogs`,
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
    useGetBlogsByCategoryQuery,
} = categoriesApi;
