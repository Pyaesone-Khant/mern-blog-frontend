import { useState } from "react";
import { useCreateBlogMutation } from "./blogApi";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { useGetAllCategoriesQuery } from "../categories/categoriesApi";
import {Loader, SubmitBtn, FormLabel} from "@/components";
import {setAlertMessage} from "@/core/globalSlice.js";
import {Form, Input, Select, Upload} from "antd";
import {MdOutlineFileUpload} from "react-icons/md";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
const CreateBlogForm = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {data : userData} = useGetUserDataQuery();
    const user = userData?.data

    const [createBlog] = useCreateBlogMutation();
    const nav = useNavigate();
    const { data, isLoading, isFetching } = useGetAllCategoriesQuery();
    const categories = data?.data;

    const [fileList, setFileList] = useState([]);

    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        const blogImage = values?.image?.file ||  null;
        delete values.image;

        const blogData = { ...values, userId: user?._id};
        let formData = new FormData();
        formData.append("blogData", JSON.stringify(blogData));
        formData.append("blogImage", blogImage);

        try {
            setIsSubmitting(true);
            const { data } = await createBlog(formData);
            if (data?.success) {
                setIsSubmitting(false);
                dispatch(setAlertMessage({type : "success", content : data?.message}))
                nav("/");
            } else {
                setIsSubmitting(false);
                dispatch(setAlertMessage({type : "error", content : data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const supportedFileType = [".jpg", ".jpeg", ".png", ".webp"]
    const uploadProps = {
        fileList : fileList,
        beforeUpload: () => false,
        accept : [...supportedFileType],
        maxCount : 1,
    }

    const imageValidator = (rule, value) => {
        const file = value?.file;
        const maxSize = 5 * 1024 * 1024;
        if(file?.size > maxSize){
            return Promise.reject("File size must be less than 5MB");
        }else{
            return Promise.resolve();
        }
    }

    if (isLoading || isFetching) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <section className=" w-full">
            <div className="common-card">
                <h2 className="form-tlt mb-8 text-center "> Create New Blog </h2>

                <Form form={form} layout={"vertical"} onFinish={onSubmit} >
                    <Form.Item label={<FormLabel label={"title"} />} name={"title"} rules={[
                        {required : true, message : "Blog title is required!"}
                    ]}>
                        <Input placeholder={"Enter blog title"} />
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"category"} />} name={"categoryId"} rules={[
                        {required : true, message : "Category is required!"}
                    ]} >
                        <Select placeholder={"Select Blog Category"} >
                            {categories?.map((item) => {
                                return (
                                    <Select.Option key={item._id} value={item._id}>
                                        {item.title}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"Photo/Image"} isOptional={true}/>} name={"image"} rules={[ {validator : imageValidator} ]} >
                        <Upload {...uploadProps} className={`!w-full bg-darkTer `} >
                            <button type={"button"} className={`flex items-center gap-1 h-10 px-4 rounded-md border border-gray-300 hover:border-blue-500 bg-white w-full duration-200`} > <MdOutlineFileUpload className={`text-xl text-gray-600`} />Click to Upload</button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"content"} />} name={"description"} rules={[
                        {required : true, message : "Blog content is required!"},
                        {min : 50, message : "Blog content must be at least 50 characters!"}
                    ]} >
                        <Input.TextArea bordered={true} placeholder={"Enter your blog content"} autoSize={{minRows : 7, maxRows: 10}}  showCount={true} minLength={50} />
                    </Form.Item>
                    <div className={`py-3`}></div>
                    <SubmitBtn label={"publish now"} isSubmitting={isSubmitting} />
                </Form>
            </div>
        </section>
    );
};

export default CreateBlogForm;
