import { useState } from "react";
// icons
import { MdOutlineFileUpload } from "react-icons/md";

// components
import { CustomBtn, FormLabel, Loader } from "@/components/index.js";
import { Form, Input, Select, Upload } from "antd";

// hooks
import { useCurrentUser } from "@/hooks/useCurrentUser.js";

// apis
import { useGetAllCategoriesQuery } from "../../categories/categoriesApi.js";
import { useCreateBlogMutation } from "../blogApi.js";

// reducers
import { setAlertMessage } from "@/core/globalSlice.js";

// third party
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {

    const [selectedImg, setSelectedImg] = useState(null);
    const { currentUser: user } = useCurrentUser();
    const [form] = Form.useForm();
    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const nav = useNavigate();
    const { data: categories, isLoading, isFetching } = useGetAllCategoriesQuery();
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        const blogImage = values?.image?.file || null;
        delete values.image;

        const blogData = { ...values, userId: user?._id };
        let formData = new FormData();
        formData.append("blogData", JSON.stringify(blogData));
        formData.append("blogImage", blogImage);

        try {
            const { data, error } = await createBlog(formData);
            if (data) {
                dispatch(setAlertMessage({ type: "success", content: "Your blog has been published successfully!" }))
                nav("/");
            } else {
                dispatch(setAlertMessage({ type: "error", content: error?.data?.message }))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const onImgChange = (info) => {
        const file = info?.file;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImg(reader.result);
            }
            reader.readAsDataURL(file)
        }
    }

    const supportedFileType = [".jpg", ".jpeg", ".png", ".webp"]
    const uploadProps = {
        // fileList : fileList,
        beforeUpload: () => false,
        accept: [...supportedFileType],
        maxCount: 1,
        onChange: onImgChange,
        onRemove: () => setSelectedImg(null),
    }

    const imageValidator = (rule, value) => {
        const file = value?.file;
        const maxSize = 2 * 1024 * 1024;
        if (file?.size > maxSize) {
            return Promise.reject("File size must be less than 2MB!");
        } else {
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
            <div className={`max-w-4xl w-full mx-auto`}>
                <h2 className="form-tlt mb-8 "> Create New Blog </h2>
                <Form form={form} layout={"vertical"} onFinish={onSubmit}>
                    <div className={`flex flex-col md:flex-row items-start justify-between md:gap-6`}>
                        <Form.Item label={<FormLabel label={"title"} />} name={"title"} rules={[
                            { required: true, message: "Blog title is required!" }
                        ]} className={`w-full`}>
                            <Input placeholder={"Enter blog title"} />
                        </Form.Item>
                        <Form.Item label={<FormLabel label={"category"} />} name={"categoryId"} rules={[
                            { required: true, message: "Category is required!" }
                        ]} className={`w-full`}>
                            <Select placeholder={"Select Blog Category"}>
                                {categories?.map((item) => {
                                    return (
                                        <Select.Option key={item._id} value={item._id}>
                                            {item.title}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item label={<FormLabel label={"Photo/Image"} isOptional={true} />} name={"image"}
                        rules={[{ validator: imageValidator }]} className={`w-full`}>
                        <Upload {...uploadProps} className={`!w-full bg-darkTer `}>
                            <button type={"button"}
                                className={`flex items-center gap-1 h-10 px-4 rounded-md border border-gray-300 hover:border-blue-500 bg-white w-full duration-200`}>
                                <MdOutlineFileUpload className={`text-xl text-gray-600`} />Click to Upload
                            </button>
                        </Upload>
                    </Form.Item>
                    {selectedImg && (

                        <img src={selectedImg} alt={"Blog Image"}
                            className={`min-h-[250px] w-full rounded-sm object-center object-cover aspect-[7/4] mb-4 border border-black/20 dark:border-white/20 -mt-3 `} />
                    )}
                    <Form.Item label={<FormLabel label={"content"} />} name={"description"} rules={[
                        { required: true, message: "Blog content is required!" },
                        { min: 50, message: "Blog content must be at least 50 characters!" }
                    ]}>
                        <Input.TextArea bordered={true} placeholder={"Enter your blog content"}
                            autoSize={{ minRows: 8, maxRows: 12 }} showCount={true} minLength={50} />
                    </Form.Item>
                    <div className={`py-3`}></div>
                    <CustomBtn htmlType={"submit"} loading={isCreating} className={"w-full"}>
                        Publish Now
                    </CustomBtn>
                </Form>
            </div>
        </section>
    );
};

export default CreateBlogForm;
