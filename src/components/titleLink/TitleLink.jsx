import {Link} from "react-router-dom";
import {useSlugChanger} from "@/hooks/useSlugChanger.js";

const TitleLink = ({blogId, title}) => {

    const slug = useSlugChanger(title);

    return (
        <Link to={`/blogs/${slug}`} state={blogId}>
            <li className="hover:text-blue-600 duration-200 text-lg font-medium dark:hover:text-darkTer">
                {" "}
                {title}{" "}
            </li>
        </Link>
    );
};

export default TitleLink;
