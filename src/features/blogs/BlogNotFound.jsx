import React from "react";
import { useSelector } from "react-redux";

const BlogNotFound = () => {
    const { title } = useSelector((state) => state.category);

    return (
        <h2 className="text-2xl font-semibold text-center p-5 rounded-md bg-white w-full">
            There is no blogs with the category title {`"${title}"`} in this
            page!
        </h2>
    );
};

export default BlogNotFound;
