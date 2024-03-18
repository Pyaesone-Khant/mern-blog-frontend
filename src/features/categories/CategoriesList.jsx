import {memo} from "react";

// components
import CategoriesCarousel from "@/features/categories/components/CategoriesCarousel.jsx";

const CategoriesList = ({categories}) => {

    return <CategoriesCarousel categories={categories}/>
};

export default memo(CategoriesList);
