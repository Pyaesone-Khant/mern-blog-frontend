import { memo } from "react";
import CategoryBtn from "./CategoryBtn";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword, setTitle } from "./categoriesSlice";
import { setCurrentPage } from "../blogs/blogSlice";

const CategoriesList = ({ categories }) => {
    const { keyword } = useSelector((state) => state.category);

    const dispatch = useDispatch();

    const handleCategory = (id, title) => {
        dispatch(setCurrentPage(1));
        dispatch(setKeyword(id));
        dispatch(setTitle(title));
    };

    return (
        <section className="flex items-center gap-3 justify-center mb-5 flex-wrap md:flex-col md:w-52 md:sticky md:top-[102px] ">
            <CategoryBtn
                title={"All"}
                event={handleCategory}
                isActive={keyword}
                id={"All"}
            />

            {categories?.map((item) => {
                return (
                    <CategoryBtn
                        key={item?._id}
                        title={item?.title}
                        event={handleCategory}
                        isActive={keyword}
                        id={item?._id}
                    />
                );
            })}
        </section>
    );
};

export default memo(CategoriesList);
