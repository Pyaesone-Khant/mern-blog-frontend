import { Link } from "react-router-dom";

const TitleLink = ({ blogId, title }) => {
    return (
        <Link to={`/blogs/${blogId}`} key={blogId}>
            <li className="hover:text-blue-600 duration-200 text-lg font-semibold dark:hover:text-darkTer">
                {" "}
                {title}{" "}
            </li>
        </Link>
    );
};

export default TitleLink;
