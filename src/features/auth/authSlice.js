import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") ? Cookies.get("token") : null;

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
        setLoginState: (state, { payload }) => {
            state.isLoggedIn = payload.isLoggedIn;
            state.token = payload.token;
        },
        logoutAccount : (state, _) => {
            Cookies.remove("token");
        }
    },
});

export const { setLoginState, logoutAccount } = authSlice.actions;
export default authSlice.reducer;
