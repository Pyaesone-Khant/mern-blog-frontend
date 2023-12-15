import { Link } from "react-router-dom";
import { SaveBtn } from "@/components";
import ActionsMenu from "@/features/blogs/components/ActionsMenu.jsx";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {useDispatch, useSelector} from "react-redux";
import {setKeyword} from "@/features/categories/categoriesSlice.js";

const BlogCardHeader = ({ isDetail, blog, blogCategory }) => {
    const {data : userData} = useGetUserDataQuery();
    const currentUser = userData?.data;

    const {isLoggedIn} = useSelector(state => state.auth)
    const isAuthor = currentUser?._id === blog?.userId;

    const dispatch = useDispatch()

    return (
        <div className="flex items-start justify-between gap-5">
            <div className="md:text-xl text-lg font-medium  duration-200 w-fit flex flex-col gap-1 ">
                {isDetail ? (
                    <h2 className="capitalize font-bold "> {blog?.title} </h2>
                ) : (
                    <Link
                        to={`/blogs/${blog?._id}`}
                        className=" line-clamp-1 hover:text-blue-500 dark:hover:text-darkTer duration-200 capitalize font-bold "
                    >
                        {" "}
                        {blog?.title}{" "}
                    </Link>
                )}
                <span onClick={ !isDetail ? () => dispatch(setKeyword(blog?.categoryId)) : () => {
                    return;
                }} className= {`text-[10px] px-2 h-5 rounded-full bg-cBlue dark:bg-darkTer text-white font-normal w-fit flex items-center ${!isDetail ? "cursor-pointer" : ""} ` }>
                    {" "}
                    {blogCategory?.title}{" "}
                </span>
            </div>
           <div className={`flex items-center gap-2`}>
               {
                   (isAuthor ||
                       currentUser?.email === "admin123@gmail.com") && isLoggedIn ? <ActionsMenu blogId={blog?._id} /> : null
               }
               {
                   !isAuthor && isLoggedIn ? <SaveBtn blog={blog} /> : null
               }
           </div>
        </div>
    );
};

export default BlogCardHeader;
