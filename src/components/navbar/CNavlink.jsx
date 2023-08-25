import { NavLink } from "react-router-dom";
const CNavlink = ({ path, title, event }) => {
    return (
        <NavLink onClick={event} to={path} className="navLink">
            {" "}
            {title}{" "}
        </NavLink>
    );
};

export default CNavlink;
