import { BsCheck2 } from "react-icons/bs";
import {
    useGetCommentByIdQuery,
    useUpdateCommentMutation,
} from "./commentsApi";
import { useEffect } from "react";
import { IconBtn } from "@/components";
import {RxCross1} from "react-icons/rx";
import {Form, Input} from "antd";
import Author from "@/features/blogs/Author.jsx";
import {useDispatch} from "react-redux";
import {toggleEdit} from "@/features/comments/commentSlice.js";

const EditCommentForm = ({ commentItem, author }) => {
    const { data: commentData } = useGetCommentByIdQuery(
        commentItem?._id
    );
    const currentComment = commentData?.data;

    const [form] = Form.useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentComment) {
            form.setFieldsValue(currentComment);
        }
    }, [currentComment]);

    const [updateComment, {isLoading}] = useUpdateCommentMutation();

    const handleCommentUpdate = async (commentData) => {
        try {
            const updatedCommentObj = {
                id: commentItem?._id,
                comment: commentData?.comment,
            };
            await updateComment(updatedCommentObj);
            dispatch(toggleEdit(false))
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <Form form={form} onFinish={handleCommentUpdate}>
            <div className={`flex items-center justify-between mb-2`}>
                <Author author={author} />
                <div className={`flex items-center gap-2`}>
                    <IconBtn
                        event={() => form.submit()}
                        icon={<BsCheck2/>}
                        action={"submit"}
                        isLoading={isLoading}
                    />
                    <IconBtn event={() => dispatch(toggleEdit(false))} icon={<RxCross1 />} action={"delete"} isLoading={isLoading} />
                </div>
            </div>
            <Form.Item name={"comment"} rules={[
                {required : true, message : "Please enter your comment!"}
            ]} className={`mb-0`} >
                <Input.TextArea className={"!bg-transparent  dark:border-gray-700 focus:!shadow-none  !resize-none dark:!placeholder-white/50 dark:!caret-white dark:text-white/80 "} />
            </Form.Item>
        </Form>
    );
};

export default EditCommentForm;
