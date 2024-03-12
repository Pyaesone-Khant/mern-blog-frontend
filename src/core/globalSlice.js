import {createSlice} from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name : "global",
    initialState: {
        alertMsg : {
            type : null,
            content : null
        },
        isOpen: false,
    },
    reducers : {
        setAlertMessage : (state, {payload}) => {
            state.alertMsg = payload
        },
        toggleMenu: (state, {payload}) => {
            state.isOpen = payload

        }
    }
})

export const {setAlertMessage, toggleMenu} = globalSlice.actions
export default globalSlice.reducer