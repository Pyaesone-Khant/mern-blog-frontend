import { useSelector } from "react-redux";
import { useGetBlogByUserIdQuery } from "../blogs/blogApi";
import { Link } from "react-router-dom";
import { Loader, BTLink } from "@/components";

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);

    const { data, isLoading } = useGetBlogByUserIdQuery(user?._id);
    const userBlogs = data?.data;

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    return (
        <section className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold"> Profile </h2>

            <div className="flex items-center gap-8 text-lg font-medium p-5 rounded-md bg-white dark:bg-slate-700">
                <h3 className="min-w-[100px]s"> Name : </h3>
                <p className="font-bold text-xl"> {user?.name} </p>
            </div>

            <div className="font-medium text-lg p-5 rounded-md bg-white dark:bg-slate-700">
                {userBlogs?.length > 1 ? (
                    <div className="flex items-start gap-8">
                        {" "}
                        <h3 className="min-w-[100px]s"> Blogs : </h3>
                        <ul className=" list-inside list-decimal flex flex-col gap-1">
                            {userBlogs?.map((blog) => {
                                return (
                                    <BTLink
                                        key={blog?._id}
                                        title={blog?.title}
                                        blogId={blog?._id}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <p className="text-xl font-semibold">
                        {" "}
                        You haven't post any blogs yet!{" "}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <Link
                    to={"/change_profile"}
                    className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-500 duration-200 block w-fit"
                >
                    Edit Profile
                </Link>

                <Link
                    to={"/delete_account"}
                    className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 duration-200 block w-fit"
                >
                    Delete Account
                </Link>
            </div>
        </section>
    );
};

export default UserProfile;
