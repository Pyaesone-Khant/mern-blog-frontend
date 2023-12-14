import { Link } from "react-router-dom";
import { SaveBtn } from "@/components";
import ActionsMenu from "@/features/blogs/components/ActionsMenu.jsx";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {useSelector} from "react-redux";

const BlogCardHeader = ({ isDetail, blog, blogCategory }) => {
    const {data : userData} = useGetUserDataQuery();
    const currentUser = userData?.data;

    const {isLoggedIn} = useSelector(state => state.auth)
    const isAuthor = currentUser?._id === blog?.userId;

    return (
        <div className="flex items-start justify-between">
            <div className="md:text-xl text-lg font-medium  duration-200 w-fit flex flex-col-reverse gap-2">
                {isDetail ? (
                    <h2 className="capitalize"> {blog?.title} </h2>
                ) : (
                    <Link
                        to={`/blogs/${blog?._id}`}
                        className=" line-clamp-1 hover:text-blue-500 dark:hover:text-darkTer duration-200 capitalize "
                    >
                        {" "}
                        {blog?.title}{" "}
                    </Link>
                )}
                <span className="md:text-sm text-xs px-2 py-1 rounded-md bg-cBlue dark:bg-darkTer text-white font-normal w-fit">
                    {" "}
                    {blogCategory?.title}{" "}
                </span>
            </div>
            <div className={`flex items-center gap-3`} >
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
