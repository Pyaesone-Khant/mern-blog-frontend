const DisplayedStatus = ({ displayed, total, type }) => {
    return (
        <p className="text-lg font-medium flex items-center h-9 md:w-fit w-full justify-center rounded-md px-2 border border-blue-600 dark:border-darkTer shadow text-blue-600 dark:text-darkTer">
            {" "}
            {`${displayed}  /  ${total} ${type}`}
        </p>
    );
};

export default DisplayedStatus;
