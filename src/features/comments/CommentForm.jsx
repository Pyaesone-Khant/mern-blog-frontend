import { useCreateCommentMutation } from "./commentsApi";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import Author from "@/features/blogs/Author.jsx";

const CommentForm = ({ blogId, form}) => {
    const [createComment, {isLoading}] = useCreateCommentMutation();
    const dispatch = useDispatch()

    const {data : userData} = useGetUserDataQuery();
    const currentUser = userData?.data;

    const onFormSubmit = async (data) => {
        const commentData = {
            userId: currentUser?._id,
            blogId: blogId,
            comment: data?.comment,
        };
        try {
            const { data } = await createComment(commentData);
            if (data?.success) {
                // dispatch(setAlertMessage({type : "success", content : data?.message}))
                form.resetFields();
            } else {
                dispatch(setAlertMessage({type : "error", content : data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="max-w-2xl w-full mx-auto p-3 rounded border border-darkBgSec/10 shadow dark:shadow-gray-600 ">
            <Author author={currentUser} />
            <Form form={form} onFinish={onFormSubmit} className={`mt-2`} >
                <Form.Item name={"comment"} validateTrigger={"onSubmit"} rules={[
                    {
                        required : true, message : "Please enter your comment!"
                    }
                ]} >
                    <Input.TextArea placeholder={`What's on your thought?`} autoSize={{
                        minRows : 4, maxRows : 4
                    }} className={`!bg-transparent !border-none focus:!shadow-none !p-0 !resize-none dark:!placeholder-white/50 dark:!caret-white dark:text-white/80 `}/>
                </Form.Item>
                <button disabled={isLoading} type={"submit"} className={`submit-btn h-8 w-fit px-3 text-sm rounded-full disabled:cursor-not-allowed disabled:bg-cBlue/50 dark:disabled:bg-darkTer/50  `}>Send</button>
            </Form>
        </section>
    );
};

export default CommentForm;
