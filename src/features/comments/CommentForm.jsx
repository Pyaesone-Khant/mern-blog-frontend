import { useCreateCommentMutation } from "./commentsApi";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {Collapse, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";

const CommentForm = ({ blogId, activeKey, form, setIsSubmitting, closeCollapse}) => {
    const [createComment] = useCreateCommentMutation();
    const dispatch = useDispatch()
    // const [form] = Form.useForm()

    const {data : userData} = useGetUserDataQuery();
    const currentUser = userData?.data;

    const onFormSubmit = async (data) => {
        const commentData = {
            userId: currentUser?._id,
            blogId: blogId,
            comment: data?.comment,
        };
        try {
            setIsSubmitting(true)
            const { data } = await createComment(commentData);
            console.log(data)
            if (data?.success) {
                closeCollapse()
                dispatch(setAlertMessage({type : "success", content : data?.message}))
            } else {
                dispatch(setAlertMessage({type : "error", content : data?.message}))
                setIsSubmitting(false)
            }
        } catch (error) {
            throw new Error(error);
        }finally {
            setIsSubmitting(false)
        }
    };

    const items = [
        {
            key : 1,
            label : '',
            children: <Form form={form} onFinish={onFormSubmit}>
                        <Form.Item name={"comment"} rules={[
                            {
                                required : true, message : "Please enter your comment!"
                            }
                        ]} >
                            <Input.TextArea placeholder={`Commenting as ${currentUser?.name}`} className={` !min-h-[80px]`}/>
                        </Form.Item>
                    </Form>
        }
    ]

    return (
        <section className="max-w-2xl w-full mx-auto mt-2">
            <Collapse activeKey={activeKey} items={items} />
        </section>
    );
};

export default CommentForm;
