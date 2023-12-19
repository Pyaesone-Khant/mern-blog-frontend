import { SaveBtn } from "@/components";
import ActionsMenu from "@/features/blogs/components/ActionsMenu.jsx";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {useDispatch, useSelector} from "react-redux";
import {setKeyword} from "@/features/categories/categoriesSlice.js";
import {Tag} from "antd";
import {setCurrentPage} from "@/features/blogs/blogSlice.js";

const BlogCardHeader = ({ isDetail, blog, blogCategory, changeRoute }) => {
    const {data : userData} = useGetUserDataQuery();
    const currentUser = userData?.data;

    const {isLoggedIn} = useSelector(state => state.auth)
    const isAuthor = currentUser?._id === blog?.userId;

    const dispatch = useDispatch()

    const onCategoryChange = () => {
        dispatch(setKeyword(blog?.categoryId));
        dispatch(setCurrentPage(1));
    }

    return (
        <div className="flex items-start justify-between gap-5">
            <div className=" text-xl font-medium  duration-200 w-fit flex flex-col gap-1 ">
                {isDetail ? (
                    <h2 className="capitalize font-semibold font-sans tracking-normal"> {blog?.title} </h2>
                ) : (
                    <h2
                        onClick={changeRoute}
                        className=" line-clamp-1 hover:text-blue-500 dark:hover:text-darkTer duration-200 capitalize font-semibold cursor-pointer font-sans tracking-normal "
                    >
                        {" "}

                        {blog?.title}{" "}
                    </h2>
                )}
                <Tag onClick={ onCategoryChange } color="success" className={`w-fit rounded-full hidden dark:block ${!isDetail ? "cursor-pointer" : "pointer-events-none "} `} > {blogCategory?.title} </Tag>
                <Tag onClick={ onCategoryChange } color="processing" className={`w-fit rounded-full dark:hidden ${!isDetail ? "cursor-pointer " : "pointer-events-none "} `} > {blogCategory?.title} </Tag>
            </div>
           <div className={`flex items-center gap-2`}>
               {
                   (isAuthor ||
                       currentUser?.email === "admin123@gmail.com") && isLoggedIn ? <ActionsMenu blogId={blog?._id} /> : null
               }
               {
                   !isAuthor && isLoggedIn ? <SaveBtn blogId={blog?._id} /> : null
               }
           </div>
        </div>
    );
};

export default BlogCardHeader;
