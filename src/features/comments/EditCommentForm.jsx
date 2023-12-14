import { BsCheck2 } from "react-icons/bs";
import {
    useGetCommentByIdQuery,
    useUpdateCommentMutation,
} from "./commentsApi";
import { useEffect } from "react";
import { IconBtn } from "@/components";
import {RxCross1} from "react-icons/rx";
import {Form, Input} from "antd";

const EditCommentForm = ({ setIsEditing, commentItem }) => {
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
            <Form.Item name={"comment"} rules={[
                {required : true, message : "Please enter your comment!"}
            ]}>
                <Input.TextArea className={"!min-h-[80px]"} />
            </Form.Item>
            <div className={`flex items-center gap-3`}>
                <IconBtn
                    event={() => form.submit()}
                    icon={<BsCheck2/>}
                    tooltip={"Save"}
                    action={"submit"}
                />
                <IconBtn event={() => setIsEditing(false)} icon={<RxCross1 />} action={"delete"} tooltip={"Cancel"} />
            </div>
        </Form>
    );
};

export default EditCommentForm;
