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
        <section className="w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-5">
                {" "}
                {user?.name}'s Blogs{" "}
            </h2>

            <div className="font-medium text-xl p-3 rounded-md bg-white">
                {userBlogs?.length > 0 ? (
                    <ul className=" list-inside list-decimal flex flex-col gap-1">
                        {userBlogs?.map((blog) => {
                            return (
                                <Link
                                    to={`/blogs/${blog?._id}`}
                                    key={blog?._id}
                                >
                                    <li className="hover:text-blue-600 duration-200">
                                        {" "}
                                        {blog.title}{" "}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-xl font-semibold">
                        {" "}
                        {user?.name} hasn't post any blogs yet!{" "}
                    </p>
                )}
            </div>
        </section>
    );
};

export default UserBlogs;
