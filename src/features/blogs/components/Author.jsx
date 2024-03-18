// icons
import { MdAccountCircle } from "react-icons/md";

// hooks
import { useSlugChanger } from "@/hooks/useSlugChanger.js";

// utils
import { cn } from "@/utils.js";

// router
import { Link } from "react-router-dom";

const Author = ({ author, isDetail, isComment }) => {

    const nameSlug = useSlugChanger(author?.name);

    return (
        <Link
            to={`/users/${nameSlug}`}
            state={author?._id}
            className={` dark:text-white text-darkBgSec hover:text-blue-600 dark:hover:text-darkTer duration-200 flex items-center gap-2 !text-base font-semibold w-fit`}
        >
            {author?.profileImage ? <img src={author?.profileImage}
                className={cn(`w-7 aspect-square object-cover rounded-full border border-darkBgSec dark:border-white/50`, {
                    "w-8": isComment,
                    "w-10": isDetail
                })} /> :
                <MdAccountCircle className={`text-3xl`} />}

            {author?.name || "Author"}
        </Link>
    );
};

export default Author;
