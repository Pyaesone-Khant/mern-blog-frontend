import { CustomBtn } from "@/components";
import { useChatContext } from "@/context/chat.context";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { useCreateMessageMutation } from "./chatApi";

export function MessageForm({
    socket
}) {

    const [form] = Form.useForm();
    const [createMessage, { isLoading }] = useCreateMessageMutation();
    const { currentConversation } = useChatContext();

    const message = Form.useWatch('message', form);

    const onFinish = async (values) => {

        if (!currentConversation) return;

        const { sender, receiver, _id } = currentConversation;
        const { message } = values;

        const payload = {
            conversationId: _id,
            text: message
        }
        socket.emit('sendMessage', {
            senderId: sender?._id,
            receiverId: receiver?._id,
            text: message,
        });
        const data = await createMessage(payload).unwrap();
        if (data) {
            form.resetFields();
        }
    }

    return (
        <Form
            form={form}
            className="flex items-end gap-2 mt-auto"
            onFinish={onFinish}
        >
            <Form.Item
                className="!mb-0 w-full"
                name={'message'}
            >
                <Input.TextArea
                    rows={1}
                    placeholder="Type a message..."
                    autoSize={{
                        minRows: 1,
                        maxRows: 4
                    }}
                    className="w-full rounded-md"
                />
            </Form.Item>
            <CustomBtn
                htmlType="submit"
                type="primary"
                className="!rounded-md"
                disabled={!message?.trim()}
                loading={isLoading}
            >
                Send
            </CustomBtn>
        </Form>
    )
}

MessageForm.propTypes = {
    socket: PropTypes.object,
}