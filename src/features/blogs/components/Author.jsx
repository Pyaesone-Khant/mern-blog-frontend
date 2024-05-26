import { useState } from "react";

// hooks
import { useSlugChanger } from "@/hooks/useSlugChanger.js";

// utils
import { cn } from "@/utils.js";

// router
import { Link } from "react-router-dom";

// third-party
import Avvvatars from "avvvatars-react";

const Author = ({ author, isDetail, isComment }) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const nameSlug = useSlugChanger(author?.name);

    // check if image is loaded or not
    const onImageLoaded = () => setIsImgLoaded(true);

    return (
        <Link
            to={`/users/${nameSlug}`}
            state={author?._id}
            className={` dark:text-white text-darkBgSec hover:text-blue-600 dark:hover:text-darkTer duration-200 flex items-center gap-2 !text-base font-semibold w-fit `}
        >
            {author?.profileImage && isImgLoaded ? (
                <img
                    src={author?.profileImage}
                    className={cn(
                        `w-7 aspect-square object-cover rounded-full border border-darkBgSec dark:border-white/50 `,
                        {
                            "w-8": isComment,
                            "w-10": isDetail,
                        }
                    )}
                    onLoad={onImageLoaded}
                />
            ) : (
                <Avvvatars value={author?.name} size={32} />
            )}

            {author?.name || "Author"}
        </Link>
    );
};

export default Author;
