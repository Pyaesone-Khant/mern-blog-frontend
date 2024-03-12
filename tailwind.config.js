/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                darkBg: "#09091F",
                darkBgSec: "#09192F",
                darkHead: "#5d97a9",
                darkPara: "#8babb8",
                darkBtn: "#7f5af0",
                darkSec: "#153B47",
                darkTer: "#10b981",
                cBlue: "#2563eb",
                darkRed: "#f85149",
                danger: "#ff4d4f",

                // palette one (modern & bold)
                c1A: "#1A1A1A",
                cFD0: "#FFD700",
                cF53: "#FF5733",
                cEF: "#EFEFEF",

                // palette two (classic)
                c33: "#333333",
                c07F: "#007BFF",
                c6CC: "#66CCCC",
                cFF: "#FFFFFF",

                // palette three (soft & serene)
                cF5: "#F5F5F5",
                c9C9: "#99CC99",
                cF96: "#FF9966",
            },
            screens: {
                xs: "300px",
                // => @media (min-width: 640px) { ... }

                md: "768px",
                // => @media (min-width: 768px) { ... }

                lg: "1024px",
                // => @media (min-width: 1024px) { ... }

                xl: "1280px",
                // => @media (min-width: 1280px) { ... }

                "2xl": "1536px",
                // => @media (min-width: 1536px) { ... }
            },

        },
        fontFamily: {
            sans: ["Montserrat", "sans-serif"],
            grm: ["Georama", "sans-serif"],
            rwy: ["Raleway", "sans-serif"],
        },
    },
    plugins: [],
    darkMode: "class",
    // corePlugins: {
    //     preflight: false,
    // }
};
