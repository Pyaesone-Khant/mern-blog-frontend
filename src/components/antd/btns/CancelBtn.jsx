
const CancelButton = ({event, isLoading}) => {
    return (
        <button disabled={isLoading} onClick={event} className={`btn text-darkBgSec hover:opacity-70 border border-darkBgSec dark:text-gray-400 dark:border-gray-400 duration-200 disabled:cursor-not-allowed disabled:opacity-70 dark:disabled:hover:opacity-70 `} >Cancel</button>
    );
};

export default CancelButton;
