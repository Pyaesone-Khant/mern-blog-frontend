import {useEffect} from "react";
import {useGetBlogByIdQuery, useUpdateBlogMutation} from "../blogApi.js";
import {useLocation, useNavigate} from "react-router-dom";
import {CustomBtn, FormLabel} from "@/components/index.js";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {Form, Input, Upload} from "antd";
import {MdOutlineFileUpload} from "react-icons/md";

const EditBlogForm = () => {
    const blogId = useLocation()?.state

    const {data: currentBlog, isLoading: isBlogDataLoading, isFetching} = useGetBlogByIdQuery(blogId, {skip: !blogId});

    const imgName = currentBlog?.blogImage?.split("/")[currentBlog?.blogImage?.split("/").length - 1];

    const [updateBlog, {isLoading}] = useUpdateBlogMutation();
    const nav = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const onSubmit = async (data) => {
        const blogImage = data?.image?.file || null;
        delete data.image;
        const updatedBlogData = {
            ...data,
            id: currentBlog?._id,
            blogImage,
        };

        let formData = new FormData();
        formData.append("blogImage", blogImage);
        formData.append("blogData", JSON.stringify(updatedBlogData));

        try {
            const {data, error} = await updateBlog(formData);
            if (data) {
                nav("/");
                dispatch(setAlertMessage({type: "success", content: data?.message}))
            } else {
                dispatch(setAlertMessage({type: "error", content: error?.data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const supportedFileType = [".jpg", ".jpeg", ".png", ".webp"];
    const uploadProps = {
        beforeUpload: () => false,
        accept: [...supportedFileType],
        maxCount: 1,
        defaultFileList: currentBlog?.blogImage && [{
            uid: currentBlog?._id,
            name: imgName,
            status: "done",
            url: currentBlog?.blogImage,
        }],
    }

    const imageValidator = (rule, value) => {
        const file = value?.file;
        const maxSize = 2 * 1024 * 1024;
        if (file?.size > maxSize) {
            return Promise.reject("File size must be less than 2MB");
        } else {
            return Promise.resolve();
        }
    }

    useEffect(() => {
        if (!isBlogDataLoading) {
            form.setFieldsValue(currentBlog);
        }
    }, [currentBlog]);

    // if (isBlogDataLoading || isFetching) {
    //     return (
    //         <div className="w-full flex items-center justify-center ">
    //             <Loader/>
    //         </div>
    //     );
    // }

    return (
        <section className=" w-full">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="form-tlt mb-8"> Edit Blog </h2>
                <Form form={form} layout={"vertical"} onFinish={onSubmit}>
                    <div className={`flex flex-col md:flex-row items-start justify-between md:gap-6 w-full`}>
                        <Form.Item label={<FormLabel label={"title"}/>} name={"title"} rules={[
                            {required: true, message: "Blog title is required!"}
                        ]} className={`w-full`}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={<FormLabel label={"Photo/Image"} isOptional={true}/>} name={"image"}
                                   className={"w-full md:max-w-[50%]"}
                                   rules={[{validator: imageValidator}]}>
                            <Upload {...uploadProps} className={`bg-darkTer`}>
                                <button type={"button"}
                                        className={`flex items-center gap-1 h-10 px-4 rounded-md border border-gray-300 hover:border-blue-500 bg-white w-full duration-200`}>
                                    <MdOutlineFileUpload className={`text-xl text-gray-600`}/>Click to Upload
                                </button>
                            </Upload>
                        </Form.Item>
                    </div>
                    <Form.Item label={<FormLabel label={"content"}/>} name={"description"} rules={[
                        {required: true, message: "Blog content is required!"}
                    ]}>
                        <Input.TextArea bordered={true} autoSize={{minRows: 7, maxRows: 10}} showCount={true}
                                        minLength={50}/>
                    </Form.Item>
                    <div className={`pt-6 flex items-center gap-4`}>
                        <CustomBtn variant={"cancel"} className={`w-full`}
                                   onClick={() => nav(-1, {state: blogId})}
                                   disabled={isLoading}>
                            Cancel
                        </CustomBtn>
                        <CustomBtn htmlType={"submit"} loading={isLoading} className={`w-full`}>
                            Save
                        </CustomBtn>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default EditBlogForm;
