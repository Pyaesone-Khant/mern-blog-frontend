import { Link } from "react-router-dom";
import {AWS_IMAGE_URL} from "@/Constants.js";
import {MdAccountCircle} from "react-icons/md";

const Author = ({ author }) => {
    return (
        <Link
            to={`/profile/${author?._id}`}
            className={` dark:text-gray-300 text-darkBgSec hover:text-blue-600 dark:hover:text-darkTer duration-200 flex items-center gap-2 !text-base font-medium w-fit `}
        >
            {author?.profileImage ? <img src={AWS_IMAGE_URL + author?.profileImage}
                                         className={`w-7 aspect-square object-cover rounded-full`}/> :
                <MdAccountCircle className={`text-3xl`}/>}

            {author?.name}{" "}
        </Link>
    );
};

export default Author;
