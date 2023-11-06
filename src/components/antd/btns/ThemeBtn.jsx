import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeBtn = () => {
    const handleTheme = () => {
        const isDark = window.localStorage.getItem("theme")
            ? window.localStorage.getItem("theme")
            : false;

        isDark
            ? window.localStorage.removeItem("theme")
            : window.localStorage.setItem("theme", "dark");

        window.dispatchEvent(new Event("storage"));
    };

    return (
            <button onClick={handleTheme} className="text-xl">
                {" "}
                {localStorage.getItem("theme") === "dark" ? (
                    <BsSunFill />
                ) : (
                    <BsMoonFill />
                )}{" "}
            </button>
    );
};

export default ThemeBtn;
