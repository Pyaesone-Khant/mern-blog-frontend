import { useEffect, useState } from "react";
// icons

// components
import { CustomBtn, FormLabel, Loader } from "@/components/index.js";
import { Form, Input, Upload } from "antd";

// apis
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "../blogApi.js";

// reducers
import { setAlertMessage } from "@/core/globalSlice.js";

// third party
import { MdUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const EditBlogForm = () => {
    const blogId = useLocation()?.state;
    const [selectedImg, setSelectedImg] = useState(null);

    const { data: currentBlog, isLoading: isBlogDataLoading } =
        useGetBlogByIdQuery(blogId, { skip: !blogId });

    const imgName =
        currentBlog?.blogImage?.split("/")[
            currentBlog?.blogImage?.split("/").length - 1
        ];

    const [updateBlog, { isLoading }] = useUpdateBlogMutation();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onSubmit = async (data) => {
        const blogImage = data?.file?.file || null;
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
            const { data, error } = await updateBlog(formData);
            if (data) {
                nav("/");
                dispatch(
                    setAlertMessage({ type: "success", content: data?.message })
                );
            } else {
                dispatch(
                    setAlertMessage({
                        type: "error",
                        content: error?.data?.message,
                    })
                );
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
            };
            reader.readAsDataURL(file);
        }
    };

    const supportedFileType = [".jpg", ".jpeg", ".png", ".webp"];
    const uploadProps = {
        beforeUpload: () => false,
        accept: [...supportedFileType],
        maxCount: 1,
        defaultFileList: currentBlog?.blogImage && [
            {
                uid: currentBlog?._id,
                name: imgName,
                status: "done",
                url: currentBlog?.blogImage,
            },
        ],
        onChange: onImgChange,
        onRemove: () => setSelectedImg(null),
    };

    const imageValidator = (rule, value) => {
        const file = value?.file;
        const maxSize = 2 * 1024 * 1024;
        if (file?.size > maxSize) {
            return Promise.reject("File size must be less than 2MB");
        } else {
            return Promise.resolve();
        }
    };

    useEffect(() => {
        if (!isBlogDataLoading) {
            form.setFieldsValue(currentBlog);
            setSelectedImg(currentBlog?.blogImage);
        }
    }, [currentBlog]);

    if (isBlogDataLoading) return <Loader />;

    return (
        <section className=" w-full">
            <div className="max-w-3xl mx-auto w-full">
                <h2 className="form-tlt mb-8"> Edit Blog </h2>
                <Form form={form} layout={"vertical"} onFinish={onSubmit}>
                    <Form.Item
                        label={<FormLabel label={"title"} />}
                        name={"title"}
                        rules={[
                            {
                                required: true,
                                message: "Blog title is required!",
                            },
                        ]}
                        className={`w-full`}
                    >
                        <Input
                            placeholder="Title"
                            className="bg-transparent dark:text-white dark:placeholder:text-gray-400 "
                        />
                    </Form.Item>
                    <Form.Item
                        label={<FormLabel label={"content"} />}
                        name={"description"}
                        rules={[
                            {
                                required: true,
                                message: "Blog content is required!",
                            },
                        ]}
                    >
                        <Input.TextArea
                            autoSize={{ minRows: 8, maxRows: 12 }}
                            minLength={50}
                            className="!resize-none !bg-transparent text-darkBg dark:text-white dark:placeholder:!text-gray-300 h-full placeholder:font-medium"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"file"}
                        label={
                            <FormLabel
                                label={"Image/Photo"}
                                isOptional={true}
                            />
                        }
                        rules={[{ validator: imageValidator }]}
                        className={`w-full !bg-transparent`}
                    >
                        <Upload.Dragger
                            {...uploadProps}
                            className="!bg-transparent"
                        >
                            {selectedImg ? (
                                <img
                                    src={selectedImg}
                                    alt="Preview Image"
                                    className={
                                        "w-full h-full object-cover object-center rounded-sm"
                                    }
                                />
                            ) : (
                                <div className=" text-gray-600 dark:text-gray-300 flex flex-col items-center justify-center gap-3 !bg-transparent">
                                    <MdUpload className="!h-12 !w-12 text-cusBlue-500" />
                                    <p className="px-6">
                                        {" "}
                                        Include a high-quality image to your
                                        story to make it more inviting to
                                        readers.{" "}
                                    </p>
                                    <h2 className="text-base font-medium">
                                        Drop a file (or) Click to upload
                                    </h2>
                                    <p className="text-sm">
                                        Maximum upload size: 2mb
                                    </p>
                                </div>
                            )}
                        </Upload.Dragger>
                    </Form.Item>

                    <div className={`pt-6 flex items-center gap-4`}>
                        <CustomBtn
                            variant={"cancel"}
                            className={`w-full`}
                            onClick={() => nav(-1, { state: blogId })}
                            disabled={isLoading}
                        >
                            Cancel
                        </CustomBtn>
                        <CustomBtn
                            htmlType={"submit"}
                            loading={isLoading}
                            className={`w-full`}
                        >
                            Save
                        </CustomBtn>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default EditBlogForm;
