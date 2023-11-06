import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "category",
    initialState: {
        keyword: "All",
    },
    reducers: {
        setKeyword: (state, { payload }) => {
            state.keyword = payload;
        },
    },
});

export const { setKeyword } = categoriesSlice.actions;
export default categoriesSlice.reducer;
