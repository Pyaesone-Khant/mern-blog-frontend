import { useSelector } from "react-redux";
import {useGetCategoryByIdQuery} from "@/features/categories/categoriesApi.js";

const BlogNotFound = () => {
    const { keyword } = useSelector((state) => state.category);

    const {data} = useGetCategoryByIdQuery(keyword)
    const category = data?.data

    return (
        <h2 className="text-2xl font-semibold text-center flex items-center justify-center p-5 rounded-md bg-white h-full w-full dark:bg-slate-700">
            There is no blogs with the category title
            <span className="text-blue-600 dark:text-darkTer ml-2">
                {`"${category?.title || "All"}"`}
            </span>
            !
        </h2>
    );
};

export default BlogNotFound;
