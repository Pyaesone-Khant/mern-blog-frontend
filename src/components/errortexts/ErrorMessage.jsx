const ErrorMessage = ({ message, isFromApi }) => {
    return (
        <p className={`${isFromApi ? "api-error" : "error"}`}> {message} </p>
    );
};

export default ErrorMessage;
