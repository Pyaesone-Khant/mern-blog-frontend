const IconBtn = ({ event, action, icon, isLoading }) => {
    return (
        <button
            type={"button"}
            onClick={event}
            disabled={isLoading}
            className={`outline-none border-none text-white p-2 rounded ${
                action === "delete"
                    ? "bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 "
                    : action === "submit"
                    ? "bg-cBlue hover:bg-blue-500 dark:bg-darkTer/80 dark:hover:bg-darkTer disabled:bg-cBlue/50 dark:disabled:bg-darkTer/50"
                    : ""
            } duration-200 disabled:cursor-not-allowed `}
        >
            {" "}
            {icon}{" "}
        </button>
    );
};

export default IconBtn;
