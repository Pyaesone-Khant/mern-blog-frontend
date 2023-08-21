import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "category",
    initialState: {
        keyword: "All",
        title: "All",
    },
    reducers: {
        setKeyword: (state, { payload }) => {
            state.keyword = payload;
        },
        setTitle: (state, { payload }) => {
            state.title = payload;
        },
    },
});

export const { setKeyword, setTitle } = categoriesSlice.actions;
export default categoriesSlice.reducer;
