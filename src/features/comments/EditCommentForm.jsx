import {useEffect} from "react";

// icons
import {BsCheck2} from "react-icons/bs";
import {RxCross1} from "react-icons/rx";

// components
import {IconBtn} from "@/components";
import Author from "@/features/blogs/components/Author.jsx";
import {Form, Input} from "antd";

// apis
import {useGetCommentByIdQuery, useUpdateCommentMutation,} from "./commentsApi";

// reducers
import {setAlertMessage} from "@/core/globalSlice.js";

// redux
import {useDispatch} from "react-redux";

const EditCommentForm = ({commentItem, author, toggleEditing}) => {
    const {data: commentData} = useGetCommentByIdQuery(
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

    const handleCommentUpdate = async ({comment}) => {
        try {
            const updatedCommentObj = {
                id: commentItem?._id,
                comment,
            };
            const {data, error} = await updateComment(updatedCommentObj);
            if (data) {
                toggleEditing();
            } else {
                dispatch(setAlertMessage({type: "error", content: error?.data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <Form form={form} onFinish={handleCommentUpdate}>
            <div className={`flex items-center justify-between mb-2`}>
                <Author author={author} isComment={true}/>
                <div className={`flex items-center gap-2`}>
                    <IconBtn
                        event={() => form.submit()}
                        icon={<BsCheck2/>}
                        action={"submit"}
                        isLoading={isLoading}
                    />
                    <IconBtn event={toggleEditing} icon={<RxCross1/>} action={"delete"}
                             isLoading={isLoading}/>
                </div>
            </div>
            <Form.Item name={"comment"} rules={[
                {required: true, message: "Please enter your comment!"}
            ]} className={`mb-0`}>
                <Input.TextArea
                    className={"!bg-transparent  dark:border-gray-700 focus:!shadow-none  !resize-none dark:!placeholder-white/50 dark:!caret-white dark:text-white/80 "}/>
            </Form.Item>
        </Form>
    );
};

export default EditCommentForm;
