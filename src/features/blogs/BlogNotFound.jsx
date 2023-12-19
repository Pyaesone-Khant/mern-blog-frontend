import { useSelector } from "react-redux";
import {useGetCategoryByIdQuery} from "@/features/categories/categoriesApi.js";

const BlogNotFound = () => {
    const { keyword } = useSelector((state) => state.category);

    const {data} = useGetCategoryByIdQuery(keyword)
    const category = data?.data

    return (
        <section className={`flex items-center justify-center h-full rounded-md bg-cBlue/10 dark:bg-darkTer/10`} >
            <h2 className="text-xl p-3 text-center ">
                There is no blogs with the category title
                <span className="text-blue-600 dark:text-darkTer ml-2 font-medium ">
                {`"${category?.title || "All"}"`}
            </span>
                !
            </h2>
        </section>
    );
};

export default BlogNotFound;
