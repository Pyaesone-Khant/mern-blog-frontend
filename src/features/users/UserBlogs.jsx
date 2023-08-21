import { useGetAllBlogsQuery } from "../blogs/blogApi";
import { Loader } from "../../components";
import { Link, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "./UserApi";

const UserBlogs = () => {
    const { userId } = useParams();
    const { data: userData } = useGetUserByIdQuery(userId);
    const { data: blogsData, isLoading, isFetching } = useGetAllBlogsQuery();
    const blogs = blogsData?.data;
    const user = userData?.data;
    const userBlogs = blogs?.filter((blog) => blog.userId === userId);

    if (isLoading || isFetching) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-5">
                {" "}
                {user?.name}'s Blogs{" "}
            </h2>
            <ul className=" list-inside list-decimal text-xl font-medium flex flex-col gap-1">
                {userBlogs?.map((blog) => {
                    return (
                        <Link to={`/blogs/${blog?._id}`} key={blog?._id}>
                            <li className="hover:text-blue-600 duration-200">
                                {" "}
                                {blog.title}{" "}
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </section>
    );
};

export default UserBlogs;
