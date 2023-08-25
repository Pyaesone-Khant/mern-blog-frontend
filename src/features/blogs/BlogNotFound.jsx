import { useSelector } from "react-redux";

const BlogNotFound = () => {
    const { title } = useSelector((state) => state.category);

    return (
        <h2 className="text-2xl font-semibold text-center p-5 rounded-md bg-white w-full dark:bg-slate-700">
            There is no blogs with the category title{" "}
            <span className="text-blue-600 dark:text-darkTer">
                {" "}
                {`"${title}"`}
            </span>{" "}
            !
        </h2>
    );
};

export default BlogNotFound;
