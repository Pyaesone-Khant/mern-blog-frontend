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
import {useGetUserByIdQuery} from "@/features/users/UserApi.js";

const EditCommentForm = ({ setIsEditing, commentItem, author }) => {
    const { data: commentData } = useGetCommentByIdQuery(
        commentItem?._id
    );
    const currentComment = commentData?.data;

    const [form] = Form.useForm()

    useEffect(() => {
        if (currentComment) {
            form.setFieldsValue(currentComment);
        }
    }, [currentComment]);

    const [updateComment] = useUpdateCommentMutation();

    const handleCommentUpdate = async (commentData) => {
        try {
            const updatedCommentObj = {
                id: commentItem?._id,
                comment: commentData?.comment,
            };
            await updateComment(updatedCommentObj);
            setIsEditing(false);
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <Form form={form} onFinish={handleCommentUpdate}>
            <div className={`flex items-center justify-between mb-1`}>
                <Author author={author} />
                <div className={`flex items-center gap-2`}>
                    <IconBtn
                        event={() => form.submit()}
                        icon={<BsCheck2/>}
                        action={"submit"}
                    />
                    <IconBtn event={() => setIsEditing(false)} icon={<RxCross1 />} action={"delete"} />
                </div>
            </div>
            <Form.Item name={"comment"} rules={[
                {required : true, message : "Please enter your comment!"}
            ]} className={`ml-9 mb-2`} >
                <Input.TextArea className={"!min-h-[80px]"} />
            </Form.Item>

        </Form>
    );
};

export default EditCommentForm;
