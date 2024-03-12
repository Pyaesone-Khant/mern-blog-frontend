import {useGetBlogByUserIdQuery} from "../blogs/blogApi";
import {useGetSavedBlogsQuery, useGetUserByIdQuery, useGetUserDataQuery} from "../users/UserApi";
import {Link, useLocation} from "react-router-dom";
import {Loader} from "@/components";
import ChangeNameModal from "@/features/users/components/ChangeNameModal.jsx";
import ChangePasswordModal from "@/features/users/components/ChangePasswordModal.jsx";
import UserAvatar from "@/features/users/components/UserAvatar.jsx";
import AccountDeleteForm from "@/features/users/components/AccountDeleteForm.jsx";
import React, {useEffect} from "react";
import {useAuth} from "@/hooks/useAuth.js";
import {BlogsList} from "@/features/index.js";
import {MdOutlineArrowForward} from "react-icons/md";
import {useSlugChanger} from "@/hooks/useSlugChanger.js";
import {useResponsive} from "@/hooks/useResponsive.js";
import {cn} from "@/utils.js";

const UserProfile = () => {
    const {token} = useAuth();
    const userId = useLocation()?.state;
    const pathname = useLocation().pathname;
    const {isMediumDevice} = useResponsive();

    const {data: currentUser} = useGetUserDataQuery();

    const {data: user, isLoading: isULoading} = useGetUserByIdQuery(userId, {
        skip: !userId,
    });
    const isUserAuth = currentUser?._id === user?._id && token;
    const nameSlug = useSlugChanger(user?.name)

    const {data: createdBlogs, isLoading: isCBLoading} =
        useGetBlogByUserIdQuery(userId, {
            skip: !userId,
        });
    const userBlogs = isUserAuth ? createdBlogs?.slice(0, 3) : createdBlogs;
    const hasMoreCBlogs = createdBlogs?.length > 3;
    const totalCBlogs = createdBlogs?.length;

    const {data: savedBlogsData, isLoading: isSBLoading} = useGetSavedBlogsQuery(userId, {
        skip: !token,
    });
    const savedBlogs = isUserAuth && savedBlogsData?.slice(0, 3);
    const hasMoreSBlogs = savedBlogsData?.length > 3;
    const totalSBlogs = savedBlogsData?.length;


    // mod codes
    useEffect(() => {
        if (user) {
            document.title = user.name
        }
        return () => {
            document.title = "Write"
        }

    }, [user])

    if (isULoading || isCBLoading || isSBLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loader/>
            </div>
        );
    }
    return (
        <section
            className={cn(`flex flex-col-reverse items-start w-full max-w-7xl mx-auto justify-between gap-10 pb-10`, {"flex-row": !isMediumDevice})}>

            <div className={`max-w-4xl w-full space-y-8`}>
                <div className={`space-y-4`}>
                    <BlogsList blogs={userBlogs} title={`created blogs (${totalCBlogs}) `}/>
                    {
                        hasMoreCBlogs && isUserAuth && <Link to={`/users/${nameSlug}/blogs`}
                                                             state={user?.id}
                                                             className={`flex items-center gap-1 w-fit mx-auto text-sm text-cBlue dark:text-darkTer font-semibold border-b dark:border-darkTer border-cBlue font-sans`}>
                            See All ({totalCBlogs}) <MdOutlineArrowForward/>
                        </Link>
                    }
                </div>

                {isUserAuth && <div className={`space-y-4`}>
                    <BlogsList blogs={savedBlogs} title={`saved blogs (${totalSBlogs}) `}/>
                    {
                        hasMoreSBlogs && <Link to={`/users/${nameSlug}/saved`}
                                               state={user?.id}
                                               className={`flex items-center gap-1 w-fit mx-auto text-sm text-cBlue dark:text-darkTer font-semibold border-b dark:border-darkTer border-cBlue font-sans`}>
                            See All ({totalSBlogs}) <MdOutlineArrowForward/>
                        </Link>
                    }
                </div>}
            </div>

            <section
                className={cn("flex flex-col gap-5 w-full transition-200", {"max-w-md sticky top-[92px]": !isMediumDevice})}>
                <h2 className="text-2xl font-bold">
                    {" "}
                    {isUserAuth ? " Your " : (user?.name || "User") + "'s"} Profile{" "}
                </h2>

                {/* profile picture */}
                <UserAvatar user={user} isUserAuth={isUserAuth}/>

                {/*name block*/}
                <ChangeNameModal user={user} isUserAuth={isUserAuth}/>

                {/*email block*/}
                {isUserAuth && <div
                    className={` flex flex-col gap-2 font-medium p-5 rounded-md bg-cBlue/10 dark:bg-darkTer/10 `}>
                    <h3 className="md:min-w-[120px] text-lg"> Email : </h3>
                    <div className={`flex justify-between items-center w-full`}>
                        <p className="font-semibold text-xl"> {currentUser?.email} </p>
                        <Link to={"/changeEmail"} state={pathname}
                              className={`text-sm border border-cBlue dark:border-darkTer h-9 px-4 rounded-sm flex items-center justify-center text-cBlue dark:text-darkTer`}>Change</Link>
                    </div>
                </div>}

                {/*password block*/}
                <ChangePasswordModal isUserAuth={isUserAuth}/>

                {isUserAuth && (
                    <AccountDeleteForm/>
                )}
            </section>
        </section>
    );
};

export default UserProfile;
