import { NavLink } from "react-router-dom";
const CNavlink = ({ path, title, event, icon }) => {
    return (
        <NavLink onClick={event} to={path} className="navLink">
            <span className={`text-xl`}>
                {icon}
            </span>
            {title}{" "}
        </NavLink>
    );
};

export default CNavlink;
