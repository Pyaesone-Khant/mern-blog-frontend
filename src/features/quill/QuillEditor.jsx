import {useState} from 'react';
import ReactQuill from "react-quill";
import {Form} from "antd";
import {CustomBtn} from "@/components/index.js";

const QuillEditor = () => {
    const [value, setValue] = useState("");

    const modules = {
        toolbar: [
            [{"header": [false]}],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{"list": "ordered"}, {"list": "bullet"}],
            ["clean"]
        ]
    }

    const format = [
        "header",
        "bold", "italic", "underline", "strike", "blockquote",
        "list", "bullet",
        "clean"
    ]

    const onFinish = ({content}) => {
        setValue(content)
    }

    return <section className={`w-full flex flex-col relative overflow-hidden`}>
        <Form onFinish={onFinish}>
            <Form.Item name={"content"} rules={[
                {required: true, message: "Content is required"}
            ]}>
                <ReactQuill theme={"snow"}
                            placeholder={"Enter your content here . . ."}
                            modules={modules} formats={format}>

                </ReactQuill>
            </Form.Item>
            <CustomBtn htmlType={"submit"}>
                Submit
            </CustomBtn>
        </Form>

        <div className={`mt-10 !list-disc `} dangerouslySetInnerHTML={{__html: value}}>
        </div>

    </section>
};

export default QuillEditor;
