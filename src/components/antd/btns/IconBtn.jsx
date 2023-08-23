import { Tooltip } from "antd";

const IconBtn = ({ event, action, tooltip, icon }) => {
    return (
        <Tooltip
            placement="top"
            title={<p className="font-sans"> {tooltip} </p>}
        >
            <button
                onClick={event}
                className={`outline-none border-none text-white p-2 rounded ${
                    action === "delete"
                        ? "bg-red-600 hover:bg-red-500"
                        : action === "submit"
                        ? "bg-blue-600 hover:bg-blue-500"
                        : "bg-black hover:bg-slate-800"
                } duration-200`}
            >
                {" "}
                {icon}{" "}
            </button>
        </Tooltip>
    );
};

export default IconBtn;
