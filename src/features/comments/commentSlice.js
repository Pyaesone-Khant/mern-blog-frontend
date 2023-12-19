import {createSlice} from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        isEditing: false,
    },
    reducers: {
        toggleEdit: (state, {payload}) => {
            state.isEditing = payload;
        },
    },
})

export const {toggleEdit} = commentSlice.actions;
export default commentSlice.reducer;