import { useEffect, useState } from "react";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "./blogApi";
import {useNavigate, useParams} from "react-router-dom";
import {Loader, SubmitBtn, FormLabel, CancelBtn} from "@/components";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {Form, Input, Upload} from "antd";
import {MdOutlineFileUpload} from "react-icons/md";

const EditBlogForm = () => {
    const { blogId } = useParams();
    const { data, isLoading : isBlogDataLoading, isFetching } = useGetBlogByIdQuery(blogId);
    const currentBlog = data?.data;

    // console.log(currentBlog)

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
            const { data } = await updateBlog(formData);
            if (data?.success) {
                nav("/");
                dispatch(setAlertMessage({type : "success", content : data?.message}))
            } else {
                dispatch(setAlertMessage({type : "error", content : data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const supportedFileType = [".jpg", ".jpeg", ".png", ".webp"];
    const uploadProps = {
        beforeUpload: () => false,
        accept : [...supportedFileType],
        maxCount : 1,
        defaultFileList:  currentBlog?.blogImage ? [{uid : currentBlog?.blogImage, name : currentBlog?.blogImage, status : "done", url : currentBlog?.blogImage}] : [],
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

    useEffect(() => {
        if (!isBlogDataLoading) {
            form.setFieldsValue({...currentBlog});
        }
    }, [currentBlog]);

    if (isBlogDataLoading || isFetching) {
        return (
            <div className="w-full flex items-center justify-center ">
                <Loader />
            </div>
        );
    }

    return (
        <section className=" w-full">
            <div className="common-card">
                <h2 className="form-tlt mb-8"> Edit Blog </h2>

                <Form form={form} layout={"vertical"} onFinish={onSubmit} >
                    <Form.Item label={<FormLabel label={"title"} />} name={"title"} rules={[
                        {required : true, message : "Blog title is required!"}
                    ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"Photo/Image"} isOptional={true}/>} name={"image"} rules={[ {validator : imageValidator} ]} >
                        <Upload {...uploadProps} className={`!w-full bg-darkTer `} >
                            <button type={"button"} className={`flex items-center gap-1 h-10 px-4 rounded-md border border-gray-300 hover:border-blue-500 bg-white w-full duration-200`} > <MdOutlineFileUpload className={`text-xl text-gray-600`} />Click to Upload</button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"content"} />} name={"description"} rules={[
                        {required : true, message : "Blog content is required!"}
                    ]} >
                        <Input.TextArea bordered={true} autoSize={{minRows : 7, maxRows: 10}} showCount={true} minLength={50} />
                    </Form.Item>
                    <div className={`pt-6 flex items-center gap-4`}>
                        <CancelBtn event={() => nav("..")} isLoading={isLoading}/>
                        <SubmitBtn label={"save"} isSubmitting={isLoading} />
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default EditBlogForm;
