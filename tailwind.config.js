/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                darkBg: "#16161a",
                darkPara: "#94a1b2",
                darkHead: "#fffffe",
                darkBtn: "#7f5af0",
                darkSec: "#72757e",
                darkTer: "#2cb67d",
            },
        },
        fontFamily: {
            sans: ['"Raleway"', "sans-serif"],
        },
    },
    plugins: [],
    darkMode: "class",
};
