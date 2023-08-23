import { Tooltip } from "antd";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const PasswordBtn = ({ event, isShowed }) => {
    return (
        <Tooltip
            placement="top"
            title={
                <p
                    className="font-sans tracking-wide
"
                >
                    {isShowed ? "Hide" : "Show"}
                </p>
            }
        >
            <button onClick={event} type="button" className="pws-btn">
                {isShowed ? <BsEyeFill /> : <BsEyeSlashFill />}
            </button>
        </Tooltip>
    );
};

export default PasswordBtn;
