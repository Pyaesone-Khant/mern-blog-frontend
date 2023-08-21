import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") ? Cookies.get("token") : null;

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: !!token,
        user,
        token,
    },
    reducers: {
        setLoginState: (state, { payload }) => {
            state.isLoggedIn = payload.isLoggedIn;
            state.user = payload.user;
            state.token = payload.token;
        },
    },
});

export const { setLoginState } = authSlice.actions;
export default authSlice.reducer;
