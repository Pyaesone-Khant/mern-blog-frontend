import { Link } from "react-router-dom";
import {MdAccountCircle} from "react-icons/md";

const Author = ({ author }) => {
    return (
        <Link
            to={`/profile/${author?._id}`}
            className={` dark:text-white text-darkBgSec hover:text-blue-600 dark:hover:text-darkTer duration-200 flex items-center gap-2 !text-base font-semibold w-fit`}
        >
            {author?.profileImage ? <img src={author?.profileImage}
                                         className={`w-7 aspect-square object-cover rounded-full border border-darkBgSec `}/> :
                <MdAccountCircle className={`text-3xl`}/>}

            {author?.name}{" "}
        </Link>
    );
};

export default Author;
