import { BiSolidErrorCircle } from "react-icons/bi";
const ErrorMessage = ({ message, isFromApi }) => {
    return (
        <p className={`${isFromApi ? "api-error" : "error"}`}>
            {" "}
            {isFromApi ? <BiSolidErrorCircle className="text-xl" /> : ""}{" "}
            {message}{" "}
        </p>
    );
};

export default ErrorMessage;
