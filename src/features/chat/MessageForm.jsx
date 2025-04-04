import { CustomBtn } from "@/components";
import { useChatContext } from "@/context/chat.context";
import { Form, Input } from "antd";
import { useCreateMessageMutation } from "./chatApi";

export function MessageForm() {

    const [form] = Form.useForm();
    const [createMessage, { isLoading }] = useCreateMessageMutation();
    const { currentConversation } = useChatContext();

    const message = Form.useWatch('message', form);

    const onFinish = async (values) => {
        const payload = {
            conversationId: currentConversation,
            text: values.message
        }
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
