import { useSelector } from "react-redux";
import { useGetBlogByUserIdQuery } from "../blogs/blogApi";
import { useGetSavedBlogsQuery, useGetUserByIdQuery } from "../users/UserApi";
import { Link, useParams } from "react-router-dom";
import { Loader } from "@/components";
import BlogTitlesList from "./BlogTitlesList";

const UserProfile = () => {
    const { userId } = useParams();

    const { user: currentUser, isLoggedIn } = useSelector(
        (state) => state.auth
    );
    const { data: userData, isULoading } = useGetUserByIdQuery(userId);
    const user = userData?.data;

    const { data: createdBlogs, isLoading: isCBLoading } =
        useGetBlogByUserIdQuery(userId);
    const userBlogs = createdBlogs?.data;

    const { data: savedBlogs, isLoading: isSBLoading } =
        useGetSavedBlogsQuery(userId);

    const userSavedBlogs = savedBlogs?.data;

    const isUserAuth = currentUser?._id === user?._id;

    if (isULoading || isCBLoading || isSBLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <section className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">
                {" "}
                {isUserAuth ? " Your " : user?.name + "'s"} Profile{" "}
            </h2>

            <div className="flex flex-col md:flex-row md:items-center gap-5 font-medium p-5 rounded-md bg-white dark:bg-slate-700">
                <h3 className="md:min-w-[120px]"> Name : </h3>
                <p className="font-bold text-xl"> {user?.name} </p>
            </div>

            <BlogTitlesList title={"Blogs"} userBlogs={userBlogs} />

            {isLoggedIn && isUserAuth ? (
                <BlogTitlesList
                    title={"Saved Blogs"}
                    userBlogs={userSavedBlogs}
                />
            ) : (
                ""
            )}
            {isLoggedIn && isUserAuth ? (
                <div className="flex flex-col xs:flex-row items-center justify-between gap-3">
                    <Link
                        to={"/change_profile"}
                        className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-500 duration-200 block xs:w-fit w-full text-center"
                    >
                        Edit Profile
                    </Link>

                    <Link
                        to={"/delete_account"}
                        className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 duration-200 block xs:w-fit w-full text-center"
                    >
                        Delete Account
                    </Link>
                </div>
            ) : (
                ""
            )}
        </section>
    );
};

export default UserProfile;
