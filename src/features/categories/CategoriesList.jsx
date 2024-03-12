import {memo} from "react";
import CategoryBtn from "@/features/categories/CategoryBtn.jsx";
import CategoriesCarousel from "@/features/categories/components/CategoriesCarousel.jsx";

const CategoriesList = ({categories}) => {

    return <CategoriesCarousel categories={categories}/>

    return (
        <section
            className={`cat-list flex flex-nowrap gap-2 overflow-x-scroll pb-4 w-full`}>
            {
                categories?.map(category => <CategoryBtn category={category}
                                                         key={category?._id}/>)
            }
        </section>
    );
};

export default memo(CategoriesList);
