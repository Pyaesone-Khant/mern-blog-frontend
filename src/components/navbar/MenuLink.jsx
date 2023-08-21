import { Link } from "react-router-dom";

const MenuLink = ({ path, title, event }) => {
    return (
        <Link
            onClick={event}
            to={path}
            className=" text-[16px] font-sans capitalize w-full"
        >
            {" "}
            {title}{" "}
        </Link>
    );
};

export default MenuLink;
