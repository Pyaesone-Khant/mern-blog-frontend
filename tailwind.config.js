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
                //darkTer: "#2cb67d",
                darkTer: "#10b981",
                //darkTer: "#14b8a6",
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
        },
    },
    plugins: [],
    darkMode: "class",
};
