import { memo, useEffect, useState } from "react";
import CategoryBtn from "./CategoryBtn";
import { useDispatch } from "react-redux";
import { setKeyword, setTitle } from "./categoriesSlice";

const CategoriesList = ({ categories }) => {
    const [filterId, setFilterId] = useState("All");
    const [catTitle, setCatTitle] = useState("All");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setKeyword(filterId));
        dispatch(setTitle(catTitle));
    }, [filterId, catTitle]);

    const handleCategory = (id, title) => {
        setFilterId(id);
        setCatTitle(title);
    };

    return (
        <section className="flex items-center gap-3 justify-center mb-5 flex-wrap md:flex-col md:w-52 md:sticky md:top-[102px] ">
            <CategoryBtn
                title={"All"}
                event={handleCategory}
                isActive={filterId}
                id={"All"}
            />

            {categories?.map((item) => {
                return (
                    <CategoryBtn
                        key={item._id}
                        title={item.title}
                        event={handleCategory}
                        isActive={filterId}
                        id={item._id}
                    />
                );
            })}
        </section>
    );
};

export default memo(CategoriesList);
