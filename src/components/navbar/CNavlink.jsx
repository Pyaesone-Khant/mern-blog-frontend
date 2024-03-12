import {NavLink} from "react-router-dom";
import "./link.css"
import {cn} from "@/utils.js";

const CNavlink = ({href, children, className, ...props}) => {
    return (
        <NavLink to={href} className={cn(`navLink`, className)} {...props}>
            {children}
        </NavLink>
    );
};

export default CNavlink;
