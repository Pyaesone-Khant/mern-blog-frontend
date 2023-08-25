import { Link } from "react-router-dom";

const Author = ({ userId, name }) => {
    return (
        <Link
            to={`/profile/${userId}`}
            className=" italic underline underline-offset-2 hover:text-blue-600 dark:hover:text-darkTer duration-200"
        >
            {" "}
            {name}{" "}
        </Link>
    );
};

export default Author;
