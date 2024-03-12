import {Link} from "react-router-dom";
import {cn} from "@/utils.js";

const MenuLink = ({path, title, className, ...props}) => {
    return (
        <Link
            to={path}
            className={cn("text-sm font-sans font-medium capitalize w-full min-w-max px-1 md:py-1.5 py-1  inline-block", className)}
            {...props}
        >
            {" "}
            {title}{" "}
        </Link>
    );
};

export default MenuLink;
