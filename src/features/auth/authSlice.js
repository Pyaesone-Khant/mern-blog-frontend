import {createSlice} from "@reduxjs/toolkit";

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
        logoutAccount: (state) => {
            state.isLoggedIn = false;
            state.token = "";
            localStorage.setItem("token", "");
            localStorage.setItem("expiredAt", "");
        }
    },
});

export const {setLoginState, logoutAccount} = authSlice.actions;
export default authSlice.reducer;
