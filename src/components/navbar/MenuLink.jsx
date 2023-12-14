import { Link } from "react-router-dom";

const MenuLink = ({ path, title, event }) => {
    return (
        <Link
            onClick={event}
            to={path}
            className=" text-sm font-sans capitalize w-full min-w-[120px]"
        >
            {" "}
            {title}{" "}
        </Link>
    );
};

export default MenuLink;
