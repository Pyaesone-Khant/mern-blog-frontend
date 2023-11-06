import {createSlice} from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name : "global",
    initialState: {
        alertMsg : {
            type : null,
            content : null
        }
    },
    reducers : {
        setAlertMessage : (state, {payload}) => {
            state.alertMsg = payload
        }
    }
})

export const {setAlertMessage} = globalSlice.actions
export default globalSlice.reducer