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
                cBlue : "#2563eb"
                // darkBg: "#1d2416",
                // darkBgSec: "#374d13",
                // darkPara: "#2e4c11",
                // darkHead: "#5a7929",
                // darkBtn: "#7f5af0",
                // darkSec: "#374d13",
                // darkTer: "#10b981",
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
