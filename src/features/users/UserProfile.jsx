import { useSelector } from "react-redux";
import { useGetBlogByUserIdQuery } from "../blogs/blogApi";
import {useGetSavedBlogsQuery, useGetUserByIdQuery, useGetUserDataQuery} from "../users/UserApi";
import {Link, useLocation, useParams} from "react-router-dom";
import { Loader} from "@/components";
import BlogTitlesList from "./BlogTitlesList";
import ChangeNameModal from "@/features/users/ChangeNameModal.jsx";
import ChangePasswordModal from "@/features/users/ChangePasswordModal.jsx";
import UserAvatar from "@/features/users/UserAvatar.jsx";
import AccountDeleteForm from "@/features/users/AccountDeleteForm.jsx";

const UserProfile = () => {
    const { userId } = useParams();
    const {isLoggedIn}  = useSelector(state => state.auth);

    const pathname = useLocation().pathname;

    const {data : currentUser} = useGetUserDataQuery();

    const { data: userData, isULoading } = useGetUserByIdQuery(userId);
    const user = userData?.data;

    const { data: createdBlogs, isLoading: isCBLoading } =
        useGetBlogByUserIdQuery(userId);
    const userBlogs = createdBlogs?.data;

    const { data: savedBlogs, isLoading: isSBLoading } =
        useGetSavedBlogsQuery(userId);
    const userSavedBlogs = savedBlogs?.data;

    const isUserAuth = currentUser?.data?._id === user?._id && isLoggedIn;

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

            {/* profile picture */}
            <UserAvatar user={user} isUserAuth={isUserAuth} />

            {/*name block*/}
            <ChangeNameModal user={user} isUserAuth={isUserAuth} />

            {/*email block*/}
            <div className={` ${!isUserAuth ? "hidden" : ""} flex flex-col md:flex-row md:items-center gap-5 font-medium p-5 rounded-md bg-cBlue/10 dark:bg-darkTer/10 `}>
                <h3 className="md:min-w-[120px] text-lg"> Email : </h3>
                <div className={`flex justify-between items-center w-full`}>
                    <p className="font-semibold text-xl"> {user?.email} </p>
                    <Link to={"/changeEmail"} state={pathname} className={`modal-trigger`}  >Change</Link>
                </div>
            </div>

            {/*password block*/}
            <ChangePasswordModal isUserAuth={isUserAuth}/>

            {/*user's created blogs*/}
            <BlogTitlesList title={"Created Blogs"} userBlogs={userBlogs} />

            {/*user's saved blogs*/}
            {isUserAuth ? (
                <BlogTitlesList
                    title={"Saved Blogs"}
                    isSaved={true} userBlogs={userSavedBlogs}
                />
            ) : (
                ""
            )}
            {isUserAuth ? (
                <AccountDeleteForm/>
            ) : (
                ""
            )}
        </section>
    );
};

export default UserProfile;
