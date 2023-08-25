import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteBlogMutation, useGetBlogByIdQuery } from "./blogApi";
import BlogCard from "./BlogCard";
import { Loader, Spinner } from "@/components";
import { useState } from "react";
import { ErrorPage } from "@/pages";
import CommentForm from "../comments/CommentForm";
import { useSelector } from "react-redux";
import CommentsList from "../comments/CommentsList";
import { useGetAllCommentsQuery } from "../comments/commentsApi";

const BlogDetail = () => {
    const { blogId } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const { data, isLoading } = useGetBlogByIdQuery(blogId);
    const [deleteBlog] = useDeleteBlogMutation();
    const blog = data?.data;
    const nav = useNavigate();
    const { user: currentUser, isLoggedIn } = useSelector(
        (state) => state.auth
    );
    const [isCommenting, setIsCommenting] = useState(false);

    const handleCommenting = () => {
        if (isLoggedIn) {
            setIsCommenting(!isCommenting);
        } else {
            nav("/login", { state: "Please Login first!" });
        }
    };

    const { data: commentsData, isLoading: isBCLoading } =
        useGetAllCommentsQuery();
    const blogsComments = commentsData?.data?.filter(
        (item) => item.blogId === blogId
    );

    const handleDeleteBlog = async () => {
        setIsDeleting(true);
        try {
            const { data } = await deleteBlog(blogId);
            if (data?.success) {
                setIsDeleting(false);
                nav("/", { state: data?.message });
            } else {
                setIsDeleting(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    if (isLoading || isBCLoading) {
        return (
            <div className="w-full flex items-center justify-center ">
                <Loader />
            </div>
        );
    }

    return data?.success === true ? (
        <section className="w-full ">
            <div className="p-5 rounded-md shadow-md max-w-2xl w-full border bg-white flex flex-col mx-auto dark:text-white dark:bg-slate-700 dark:border-none">
                <BlogCard blog={blog} isDetail={true} />

                {currentUser?._id === blog?.userId ||
                currentUser?.email === "admin123@gmail.com" ? (
                    <div className="flex items-center gap-3 mt-5">
                        <Link
                            to={`edit`}
                            className="btn bg-black hover:bg-black/80"
                        >
                            {" "}
                            Edit{" "}
                        </Link>
                        <button
                            onClick={handleDeleteBlog}
                            className="btn delete-btn"
                        >
                            {isDeleting ? <Spinner /> : "Delete"}
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
            {/* comments */}
            <div className=" max-w-2xl mx-auto flex items-center justify-between mt-5 gap-5">
                <h2 className="text-xl font-bold"> Comments </h2>
                <button
                    onClick={handleCommenting}
                    className={`comment-btn btn `}
                >
                    {isCommenting ? "Close" : "Comment Now"}
                </button>
            </div>
            {isLoggedIn && (
                <CommentForm
                    blogId={blogId}
                    isCommenting={isCommenting}
                    setIsCommenting={setIsCommenting}
                />
            )}
            <CommentsList blogComments={blogsComments} />{" "}
        </section>
    ) : (
        <ErrorPage type={"blog"} />
    );
};

export default BlogDetail;
