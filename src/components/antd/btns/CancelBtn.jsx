import {Link} from "react-router-dom";

const CancelButton = ({event, path}) => {
    return (
        <Link onClick={event} to={path} className={`btn text-darkBgSec hover:text-darkBgSec/70 border border-darkBgSec  hover:border-darkBgSec/70 dark:text-gray-400 dark:border-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-200 duration-200 `} >Cancel</Link>
    );
};

export default CancelButton;
