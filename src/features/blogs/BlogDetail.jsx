import {Link, useParams} from "react-router-dom";
import {useGetBlogByIdQuery} from "./blogApi";
import BlogCard from "./BlogCard";
import {LikeBtn, Loader} from "@/components";
import { useState } from "react";
import { ErrorPage } from "@/pages";
import CommentForm from "../comments/CommentForm";
import {useDispatch, useSelector} from "react-redux";
import CommentsList from "../comments/CommentsList";
import { useGetAllCommentsQuery } from "../comments/commentsApi";
import {RxCross1} from "react-icons/rx";
import {FaRegComment} from "react-icons/fa";
import { Form} from "antd";
import RecommendedBlogsList from "@/features/blogs/RecommendedBlogsList.jsx";
import {GoArrowRight} from "react-icons/go";
import {toggleEdit} from "@/features/comments/commentSlice.js";

const BlogDetail = () => {
    const { blogId } = useParams();
    const { data, isLoading } = useGetBlogByIdQuery(blogId);
    const blog = data?.data;

    // comments list
    const { data: commentsData, isLoading: isBCLoading } =
        useGetAllCommentsQuery();
    const blogsComments = commentsData?.data?.filter(
        (item) => item.blogId === blogId
    );

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(
        (state) => state.auth
    );
    const [form] = Form.useForm()

    const [openDrawer, setOpenDrawer] = useState(false);

    const closeDrawer = () => {
        setOpenDrawer(false)
        form.resetFields()
        dispatch(toggleEdit(false))
    }

    if (isLoading || isBCLoading){
        return (
            <div className="w-full flex items-center justify-center ">
                <Loader />
            </div>
        );
    }

    return blog ? (
        <section className="w-full comments">
            <div className={` max-w-2xl mx-auto mb-5 `} >
                <Link to={`/`} className={`text-sm text-blue-600 dark:text-darkTer duration-200 block w-fit `}>
                    <p className={`flex items-center gap-1`}>
                        <span className={`text-2xl`}> &#8592; </span> Back to Blogs
                    </p>
                </Link>
            </div>

            <BlogCard blog={blog} isDetail={true} />

            <div className={`flex items-center justify-evenly border-t border-b border-darkBgSec/10 dark:border-gray-700 py-3 max-w-2xl mx-auto mt-5`}>
                <LikeBtn blog={blog} />
                <button
                    onClick={() => setOpenDrawer(true)}
                    className={`reaction-btn flex items-center gap-2`}
                >
                    <FaRegComment/>
                <p className=" text-sm font-medium tracking-widest ">
                    {" "}
                    <span className={`font-grm mr-1`} >{blogsComments?.length > 0 ? blogsComments?.length : ""}</span>
                    {blogsComments?.length > 1
                        ? "Comments"
                        : blogsComments?.length === 1
                            ? "Comment"
                            : ""}
                </p>
                </button>
            </div>

            {/*drawer bg*/}
            <div onClick={closeDrawer} className={` fixed w-full h-full top-0 right-0 z-20 transform ${openDrawer ? " translate-x-0 opacity-100 " : " translate-x-[100vw] opacity-0 "} duration-300 bg-black/30  `} >
            </div>

            {/*comments list and form drawer*/}
            <div className={`fixed md:max-w-lg max-w-sm w-full h-full top-0 right-0 ${openDrawer ? " translate-x-0 " : " translate-x-[100vw] "} duration-500 bg-white dark:bg-slate-800 z-30 overflow-y-scroll flex flex-col `} >
                <div className={`p-5 flex items-center justify-between `} >
                    <h2 className={`text-lg font-semibold`}>
                        Comments <span className={`font-grm font-medium`}> ({blogsComments?.length}) </span>
                    </h2>
                    <button onClick={closeDrawer} className={`text-lg`} >
                        <RxCross1/>
                    </button>
                </div>
                {
                    !isLoggedIn && <div className={`flex items-center p-5 bg-cBlue/10 dark:bg-darkTer/10 gap-5`}>
                        <p className={`w-full`}>To comment on this blog, <br/> please login first!</p>
                        <Link to={`/login`} className={` border px-4 py-1 rounded-full text-cBlue dark:text-darkTer border-cBlue dark:border-darkTer hover:bg-cBlue hover:text-white dark:hover:bg-darkTer dark:hover:text-white duration-200 min-w-max flex items-center gap-1 `}>
                            Login <GoArrowRight/>
                        </Link>
                    </div>
                }
                <div className={`p-5 ${isLoggedIn ? "pt-2" : "pt-0"} flex-1 flex flex-col`} >
                    {isLoggedIn && (
                        <CommentForm
                            blogId={blogId}
                            form={form}
                        />
                    )}
                    <CommentsList blogComments={blogsComments} />
                </div>
            </div>

            <RecommendedBlogsList categoryId={blog?.categoryId} blogId={blogId} />
        </section>
    ) : (
        <ErrorPage type={"blog"} />
    );
};

export default BlogDetail;
