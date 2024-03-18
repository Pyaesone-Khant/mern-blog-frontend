import { useEffect, useState } from "react";

// icons
import { FaRegComment } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

// components
import { BackBtn, CustomBtn, LikeBtn, Loader } from "@/components";
import RecommendedBlogsList from "@/features/blogs/RecommendedBlogsList.jsx";
import BlogsByAuthor from "@/features/blogs/components/BlogsByAuthor.jsx";
import CommentForm from "@/features/comments/CommentForm";
import CommentsList from "@/features/comments/CommentsList";
import { ErrorPage } from "@/pages";
import { Form } from "antd";
import BlogCard from "./components/BlogCard.jsx";

// apis
import { useGetCommentsByBlogIdQuery } from "@/features/comments/commentsApi.js";
import { useGetBlogByIdQuery } from "./blogApi";

// hooks
import { useAuth } from "@/hooks/useAuth.js";
import { useCurrentUser } from "@/hooks/useCurrentUser.js";

// reducers
import { toggleEdit } from "@/features/comments/commentSlice.js";

// third party
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const BlogDetail = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { slug } = useParams();
    const { token } = useAuth();
    const { currentUser } = useCurrentUser();
    const location = useLocation();
    const [form] = Form.useForm();

    const blogId = location?.state;
    const pathName = location.pathname;
    const dispatch = useDispatch();

    const { data: blog, isLoading } = useGetBlogByIdQuery(blogId, {
        skip: !blogId,
    });
    const isUserAuthor = blog?.userId === currentUser?._id;

    // comments list
    const { data: blogComments, isLoading: isBCLoading } = useGetCommentsByBlogIdQuery(blogId, {
        skip: !blogId
    })

    useEffect(() => {
        if (blog && pathName.includes(slug)) {
            document.title = blog.title;
        }
        return () => {
            document.title = "Writee";
        };
    }, [blog, pathName]);

    const closeDrawer = () => {
        setOpenDrawer(false);
        form.resetFields();
        dispatch(toggleEdit(false));
    };

    if (isLoading || isBCLoading) {
        return (
            <div className="w-full flex items-center justify-center max-w-2xl mx-auto ">
                <Loader />
            </div>
        );
    }

    return blog ? (
        <section className="w-full comments pb-10 max-w-2xl mx-auto flex flex-col gap-6">
            <BackBtn isDetail={true} />
            <BlogCard blog={blog} isDetail={true} />
            <div
                className={`flex items-center justify-evenly border-t border-b border-darkBgSec/10 dark:border-gray-700 py-3`}
            >
                <LikeBtn blog={blog} />
                <button
                    onClick={() => setOpenDrawer(true)}
                    className={`reaction-btn flex items-center gap-2`}
                >
                    <FaRegComment />
                    <p className=" text-sm font-medium tracking-widest ">
                        {" "}
                        <span className={`font-grm mr-1`}>
                            {blogComments?.length > 0
                                ? blogComments?.length
                                : null}
                        </span>
                        {blogComments?.length > 1
                            ? "Comments"
                            : blogComments?.length === 1
                                ? "Comment"
                                : ""}
                    </p>
                </button>
            </div>

            {/*drawer bg*/}
            <div
                onClick={closeDrawer}
                className={` fixed w-full h-full top-0 right-0 z-20 transform ${openDrawer
                    ? " translate-x-0 opacity-100 "
                    : " translate-x-[100vw] opacity-0 "
                    } duration-300 bg-black/30  `}
            ></div>

            {/*comments list and form drawer*/}
            <div
                className={`fixed md:max-w-lg max-w-sm w-full h-full top-0 right-0 ${openDrawer ? " translate-x-0 " : " translate-x-[100vw] "
                    } duration-500 bg-white dark:bg-slate-800 z-30 overflow-y-scroll flex flex-col `}
            >
                <div className={`p-5 flex items-center justify-between `}>
                    <h2 className={`text-lg font-semibold`}>
                        Comments{" "}
                        <span className={`font-grm font-medium`}>
                            {" "}
                            ({blogComments?.length || 0}){" "}
                        </span>
                    </h2>
                    <button onClick={closeDrawer} className={`text-lg`}>
                        <RxCross1 />
                    </button>
                </div>
                {!token && (
                    <div
                        className={`flex items-center p-5 bg-cBlue/10 dark:bg-darkTer/10 gap-5`}
                    >
                        <p className={`w-full`}>
                            You need to login <br /> to comment on this blog!
                        </p>
                        <CustomBtn
                            variant="outline"
                            size="xs"
                            isLink={true}
                            href="/login"
                            className={`gap-1 !rounded-full hover:!bg-cBlue dark:hover:!bg-darkTer hover:!text-white dark:hover:!text-white duration-200`}
                        >
                            Login <GoArrowRight />
                        </CustomBtn>
                    </div>
                )}
                <div
                    className={`p-5 ${token ? "pt-2" : "pt-0"
                        } flex-1 flex flex-col`}
                >
                    {token && <CommentForm blogId={blogId} form={form} />}
                    <CommentsList blogComments={blogComments} />
                </div>
            </div>

            {!isUserAuthor && (
                <div
                    className={`pb-10 border-b border-black/20 dark:border-white/20`}
                >
                    <BlogsByAuthor authorId={blog?.userId} blogId={blogId} />
                </div>
            )}

            <RecommendedBlogsList
                categoryId={blog?.categoryId}
                blogId={blogId}
            />
        </section>
    ) : (
        <ErrorPage type={"blog"} />
    );
};

export default BlogDetail;
