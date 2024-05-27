import { memo } from "react";

// components
import CategoriesCarousel from "@/features/categories/components/CategoriesCarousel.jsx";

const CategoriesList = ({ categories }) => {
    return categories?.length > 0 ? (
        <CategoriesCarousel categories={categories} />
    ) : null;
};

export default memo(CategoriesList);
