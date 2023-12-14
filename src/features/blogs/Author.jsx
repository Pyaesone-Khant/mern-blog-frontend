import { Link } from "react-router-dom";
import {PROFILE_IMAGE_URL} from "@/Constants.js";
import {MdAccountCircle} from "react-icons/md";

const Author = ({ userId, author, isComment }) => {
    return (
        <Link
            to={`/profile/${userId}`}
            className={` dark:text-gray-300 text-darkBgSec hover:text-blue-600 dark:hover:text-darkTer duration-200 flex items-center gap-1 ${isComment ? "text-lg font-medium" : "underline underline-offset-2 italic text-base"} w-fit `}
        >
            {
                isComment && <div>
                    {
                        author?.profileImage ? <img src={PROFILE_IMAGE_URL + author?.profileImage} className={`w-7 aspect-square object-cover rounded-full`} /> : <MdAccountCircle className={`text-3xl`} />
                    }
                </div>
            }
            {author?.name}{" "}
        </Link>
    );
};

export default Author;
