import {createSlice} from "@reduxjs/toolkit";

export const layoutSlice =createSlice({
    name: "layout",
    initialState: {
        isOpen: false,
    },
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggleMenu } = layoutSlice.actions;
export default layoutSlice.reducer;