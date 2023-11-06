import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") ? Cookies.get("token") : null;

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

const theme = window.localStorage.getItem("theme")
    ? window.localStorage.getItem("theme")
    : false;

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: !!token,
        user,
        token,
        theme,
    },
    reducers: {
        setLoginState: (state, { payload }) => {
            state.isLoggedIn = payload.isLoggedIn;
            state.user = payload.user;
            state.token = payload.token;
        },
        logoutAccount : (state, _) => {
            Cookies.remove("token");
            Cookies.remove("user")
        }
    },
});

export const { setLoginState, logoutAccount } = authSlice.actions;
export default authSlice.reducer;
