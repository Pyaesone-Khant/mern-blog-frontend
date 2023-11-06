import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "./categoriesSlice";
import { setCurrentPage } from "../blogs/blogSlice";
import {Select} from "antd";

const CategoriesList = ({ categories }) => {
    const { keyword } = useSelector((state) => state.category);

    const dispatch = useDispatch();

    const handleCategory = (id) => {
        dispatch(setCurrentPage(1));
        dispatch(setKeyword(id));
    };

    return (
        <Select className={"w-full"} defaultValue={keyword} onChange={(value) => handleCategory(value)}   >
            <Select.Option value={"all"} className={" !font-sans dark:text-white "} > All </Select.Option>
            {
                categories?.map(category => <Select.Option key={category._id} className={" !font-sans dark:text-white "} value={category._id}> {category.title} </Select.Option>)
            }
        </Select>
    );
};

export default memo(CategoriesList);
