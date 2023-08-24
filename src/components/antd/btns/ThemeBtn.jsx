import { Tooltip } from "antd";
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
        <Tooltip
            placement="bottom"
            arrow
            title={
                <p className="font-sans">
                    {" "}
                    {localStorage.getItem("theme") === "dark"
                        ? "Light"
                        : "Dark"}{" "}
                </p>
            }
        >
            <button onClick={handleTheme} className="text-xl">
                {" "}
                {localStorage.getItem("theme") === "dark" ? (
                    <BsSunFill />
                ) : (
                    <BsMoonFill />
                )}{" "}
            </button>
        </Tooltip>
    );
};

export default ThemeBtn;
