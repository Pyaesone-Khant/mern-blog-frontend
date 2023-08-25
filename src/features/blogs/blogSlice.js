import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        itemsPerPage: 3,
        currentPage: 1,
    },
    reducers: {
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload;
        },

        setItemsPerPage: (state, { payload }) => {
            state.itemsPerPage = payload;
        },
    },
});

export const { setCurrentPage, setItemsPerPage } = blogSlice.actions;
export default blogSlice.reducer;
