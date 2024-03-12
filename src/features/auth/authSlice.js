import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = localStorage.getItem("accessToken") || null;

const theme = window.localStorage.getItem("theme")
    ? window.localStorage.getItem("theme")
    : false;

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: !!token,
        token,
        theme,
    },
    reducers: {
        setLoginState: (state, {payload}) => {
            state.isLoggedIn = payload.isLoggedIn;
            state.token = payload.token;
        },
        logoutAccount: () => {
            Cookies.remove("token");
            localStorage.setItem("token", "");
            localStorage.setItem("expiredAt", "");
        }
    },
});

export const {setLoginState, logoutAccount} = authSlice.actions;
export default authSlice.reducer;
