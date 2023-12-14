import {  useNavigate, useParams } from "react-router-dom";
import {  useGetBlogByIdQuery } from "./blogApi";
import BlogCard from "./BlogCard";
import { Loader } from "@/components";
import { useState } from "react";
import { ErrorPage } from "@/pages";
import CommentForm from "../comments/CommentForm";
import {useDispatch, useSelector} from "react-redux";
import CommentsList from "../comments/CommentsList";
import { useGetAllCommentsQuery } from "../comments/commentsApi";
import {setAlertMessage} from "@/core/globalSlice.js";
import {RxCross1} from "react-icons/rx";
import {MdComment, MdSend} from "react-icons/md";
import {Form} from "antd";

const BlogDetail = () => {
    const { blogId } = useParams();
    const { data, isLoading } = useGetBlogByIdQuery(blogId);
    const blog = data?.data;
    const nav = useNavigate();
    const { isLoggedIn } = useSelector(
        (state) => state.auth
    );
    const [isCommenting, setIsCommenting] = useState(false);
    const [activeKey, setActiveKey] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form] = Form.useForm()

    const toggleCollapse = () => {
        if (isLoggedIn) {
        setActiveKey(activeKey.includes("1") ? []  : ["1"])
        setIsCommenting(!isCommenting);
        form.resetFields()
        } else {
            nav("/login");
            dispatch(setAlertMessage({type : "info", content : "Please Login to your account first!"}))
        }
    }


    const closeCollapse = () => {
        setActiveKey([])
        setIsCommenting(false);
        setIsSubmitting(false)
        form.resetFields()
    }


    const dispatch = useDispatch()
    const { data: commentsData, isLoading: isBCLoading } =
        useGetAllCommentsQuery();
    const blogsComments = commentsData?.data?.filter(
        (item) => item.blogId === blogId
    );

    if (isLoading || isBCLoading) {
        return (
            <div className="w-full flex items-center justify-center ">
                <Loader />
            </div>
        );
    }

    return data?.success === true ? (
        <section className="w-full ">
            <div className="p-5 rounded-md shadow-md max-w-2xl w-full border bg-white flex flex-col mx-auto text-darkBgSec dark:text-white dark:bg-slate-700 dark:border-none">
                <BlogCard blog={blog} isDetail={true} />
            </div>
            {/* comments */}
            <div className=" max-w-2xl mx-auto flex items-center justify-between mt-5 gap-5">
                <h2 className="text-xl font-bold"> Comments </h2>
                <div className={`flex items-center gap-4`}>
                    {isCommenting && isLoggedIn && <button disabled={isSubmitting}
                        onClick={() => form.submit()}
                        className={`text-2xl text-blue-600 dark:text-darkTer duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <MdSend/>
                    </button>}
                    <button
                        onClick={toggleCollapse}
                        className={`text-2xl text-blue-600 dark:text-darkTer duration-200`}
                    >
                        {isCommenting && isLoggedIn ? <RxCross1 className={`text-red-500`}/> :<MdComment/> }
                    </button>
                </div>
            </div>
            {isLoggedIn && (
                <CommentForm
                    blogId={blogId}
                    activeKey={activeKey}
                    form={form}
                    closeCollapse={closeCollapse}
                    setIsSubmitting={setIsSubmitting}
                />
            )}
            <CommentsList blogComments={blogsComments} />{" "}
        </section>
    ) : (
        <ErrorPage type={"blog"} />
    );
};

export default BlogDetail;
