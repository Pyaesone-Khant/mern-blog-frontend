// styles
import "./link.css"

// utils
import {cn} from "@/utils.js";

// router
import {NavLink} from "react-router-dom";

const CNavlink = ({href, children, className, ...props}) => {
    return (
        <NavLink to={href} className={cn(`navLink`, className)} {...props}>
            {children}
        </NavLink>
    );
};

export default CNavlink;
