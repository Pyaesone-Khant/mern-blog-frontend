const IconBtn = ({ event, action, icon }) => {
    return (
        <button
            type={"button"}
            onClick={event}
            className={`outline-none border-none text-white p-2 rounded ${
                action === "delete"
                    ? "bg-red-600 hover:bg-red-500"
                    : action === "submit"
                    ? "bg-cBlue hover:bg-blue-500"
                    : action === "edit"
                    ? "bg-black hover:bg-slate-800"
                    : ""
            } duration-200`}
        >
            {" "}
            {icon}{" "}
        </button>
    );
};

export default IconBtn;
