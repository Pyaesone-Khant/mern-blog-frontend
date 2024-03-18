// components
import {CustomBtn} from "@/components/index.js";
import Author from "@/features/blogs/components/Author.jsx";
import {Form, Input} from "antd";

// hooks
import {useCurrentUser} from "@/hooks/useCurrentUser.js";

// apis
import {useCreateCommentMutation} from "./commentsApi";

// reducers
import {setAlertMessage} from "@/core/globalSlice.js";

// redux
import {useDispatch} from "react-redux";

const CommentForm = ({blogId, form}) => {
    const [createComment, {isLoading}] = useCreateCommentMutation();
    const dispatch = useDispatch()
    const {currentUser} = useCurrentUser();

    const onFormSubmit = async ({comment}) => {
        const commentData = {
            userId: currentUser?._id,
            blogId: blogId,
            comment,
        };

        try {
            const {data, error} = await createComment(commentData);
            if (data) {
                form.resetFields();
            } else {
                dispatch(setAlertMessage({type: "error", content: error?.data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section
            className="max-w-2xl w-full mx-auto p-3 rounded border border-darkBgSec/10 shadow dark:shadow-gray-600 ">
            <Author author={currentUser} isComment={true}/>
            <Form form={form} onFinish={onFormSubmit} className={`mt-2`}>
                <Form.Item name={"comment"} validateTrigger={"onSubmit"} rules={[
                    {
                        required: true, message: "Please enter your comment!"
                    }
                ]}>
                    <Input.TextArea placeholder={`What's on your thought?`} autoSize={{
                        minRows: 4, maxRows: 4
                    }}
                                    className={`!bg-transparent !border-none focus:!shadow-none !p-0 !resize-none dark:!placeholder-white/50 dark:!caret-white dark:text-white/80 `}/>
                </Form.Item>
                <CustomBtn size={"xs"} htmlType={"submit"} className={`!rounded-full`} loading={isLoading}>
                    Send
                </CustomBtn>
            </Form>
        </section>
    );
};

export default CommentForm;
