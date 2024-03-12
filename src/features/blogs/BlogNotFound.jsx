import {useSelector} from "react-redux";
import {useGetCategoryByIdQuery} from "@/features/categories/categoriesApi.js";

const BlogNotFound = () => {
    const {keyword} = useSelector((state) => state.category);

    const {data: category} = useGetCategoryByIdQuery(keyword)

    return (
        <section
            className={`flex flex-1 items-center justify-center rounded-md bg-cBlue/10 dark:bg-darkTer/10 `}>
            <h2 className="p-3 text-center font-medium ">
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
