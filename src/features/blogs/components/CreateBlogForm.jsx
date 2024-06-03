import { useEffect, useState } from "react";
// icons
import { MdArrowBackIos, MdArrowRightAlt, MdUploadFile } from "react-icons/md";

// components
import { CustomBtn } from "@/components/index.js";
import { Form, Input, Select, Upload } from "antd";

// hooks
import { useCurrentUser } from "@/hooks/useCurrentUser.js";

// apis
import { useCreateBlogMutation } from "@/features/blogs/blogApi.js";
import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApi.js";

// reducers
import { setAlertMessage } from "@/core/globalSlice.js";

// third party
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
    const [data, setData] = useState({});
    const [step, setStep] = useState(1);

    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleNextStep = (data) => {
        setData(data);
        setStep(2);
    };

    const handlePrevStep = (data) => {
        setData(data);
        setStep(1);
    };

    const handleSubmit = async (values) => {
        const file = values?.file?.file || null;
        delete values?.file;
        const blogImage = file && file?.status !== "removed" ? file : null;

        const formData = new FormData();
        formData.append("blogData", JSON.stringify({ ...values }));
        formData.append("blogImage", blogImage);

        try {
            const { data, error } = await createBlog(formData);
            if (data) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        content: "Your blog has been published successfully!",
                    })
                );
                nav("/");
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

    return (
        <section className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
            {step === 1 && <FirstStep data={data} onSuccess={handleNextStep} />}
            {step === 2 && (
                <SecondStep
                    data={data}
                    onSuccess={handleSubmit}
                    handlePrevious={handlePrevStep}
                    isCreating={isCreating}
                />
            )}
        </section>
    );
};

const FirstStep = ({ data, onSuccess }) => {
    const [form] = Form.useForm();
    const [isValid, setIsValid] = useState(false);
    const title = Form.useWatch("title", form);
    const description = Form.useWatch("description", form);

    useEffect(() => {
        if (title && description?.trim().length >= 50) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [title, description]);

    const onFinish = (values) => {
        onSuccess({ ...values, ...data });
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            initialValues={data}
            className=" flex-1 flex flex-col"
        >
            <Form.Item
                name="title"
                rules={[
                    {
                        required: true,
                        message: "Blog title is required!",
                    },
                ]}
                className="mb-0"
                validateDebounce={1000}
            >
                <Input.TextArea
                    placeholder="Title"
                    className="text-3xl font-medium !border-none !shadow-none !outline-none break-words px-0 !resize-none !bg-transparent dark:text-white dark:placeholder:!text-gray-300"
                    autoSize={{ minRows: 1, maxRows: 6 }}
                />
            </Form.Item>
            <Form.Item
                name="description"
                rules={[
                    {
                        required: true,
                        message: "Blog Content is required!",
                    },
                    {
                        min: 50,
                        message: "Blog Content must be at least 50 characters",
                    },
                ]}
                className="flex-1 "
                validateDebounce={1000}
            >
                <Input.TextArea
                    placeholder="Content"
                    className="text-base !border-none !shadow-none !outline-none !resize-none px-0 !bg-transparent dark:text-white dark:placeholder:!text-gray-300 h-full placeholder:font-medium"
                />
            </Form.Item>
            <CustomBtn
                htmlType="submit"
                className="w-full disabled:!bg-gray-500 dark:disabled:!bg-gray-500"
                disabled={!isValid}
            >
                Next <MdArrowRightAlt />
            </CustomBtn>
        </Form>
    );
};

const SecondStep = ({ data, onSuccess, handlePrevious, isCreating }) => {
    const [previewImg, setPreviewImg] = useState(null);
    const [form] = Form.useForm();
    const { currentUser } = useCurrentUser();

    useEffect(() => {
        if (data?.file) {
            form.setFieldValue("file", data.file);
            onImageSelect(data?.file);
        }
    }, [data]);

    const onFinish = (values) => {
        onSuccess({ ...data, userId: currentUser?._id, ...values });
    };

    const { data: categories } = useGetAllCategoriesQuery();

    const onImageSelect = ({ file, fileList }) => {
        if (file && fileList?.length > 0) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const supportedFileType = [".jpg", ".jpeg", ".png", ".webp"];
    const uploadProps = {
        // fileList: [],
        beforeUpload: () => false,
        accept: [...supportedFileType],
        maxCount: 1,
        onChange: onImageSelect,
        onRemove: () => setPreviewImg(null),
    };

    const imageValidator = (rule, value) => {
        const file = value?.file;
        const maxSize = 2 * 1024 * 1024;
        if (file?.size > maxSize) {
            return Promise.reject("File size must be less than 2MB!");
        } else {
            return Promise.resolve();
        }
    };

    const handleBack = () => {
        const values = form.getFieldsValue();
        handlePrevious({ ...data, ...values });
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            initialValues={data}
            className="w-full"
        >
            <CustomBtn
                variant="ghost"
                size="icon"
                className="!dark:text-white mb-4"
                onClick={handleBack}
                htmlType="button"
            >
                <MdArrowBackIos /> Back
            </CustomBtn>
            <div>
                <h2 className="text-lg mb-1 dark:text-white">
                    Publishing to:{" "}
                    <span className="font-semibold">{currentUser?.name}</span>{" "}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Add or change topic so readers know what your story is
                    about.
                </p>
                <Form.Item
                    name={"categoryId"}
                    rules={[
                        {
                            required: true,
                            message: "Category is required!",
                        },
                    ]}
                    className={`w-full `}
                >
                    <Select
                        placeholder={"Add topic"}
                        className="border rounded-sm dark:border-gray-400 dark:text-white dark:placeholder:text-gray-400"
                    >
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
            <Form.Item
                name={"file"}
                rules={[{ validator: imageValidator }]}
                className={`w-full !bg-transparent`}
            >
                <Upload.Dragger {...uploadProps} className="!bg-transparent">
                    {previewImg ? (
                        <img
                            src={previewImg}
                            alt="Preview Image"
                            className={
                                "w-full h-full object-cover object-center rounded-sm"
                            }
                        />
                    ) : (
                        <div className=" text-gray-600 dark:text-gray-300 flex flex-col items-center justify-center gap-3 !bg-transparent">
                            <MdUploadFile className="!h-12 !w-12 text-cusBlue-500" />
                            <p className="px-6">
                                {" "}
                                Include a high-quality image to your story to
                                make it more inviting to readers.{" "}
                            </p>
                            <h2 className="text-base font-medium">
                                Drop a file (or) Click to upload
                            </h2>
                            <p className="text-sm">Maximum upload size: 2mb</p>
                        </div>
                    )}
                </Upload.Dragger>
            </Form.Item>
            <CustomBtn
                htmlType="submit"
                loading={isCreating}
                className="w-full"
            >
                Submit
            </CustomBtn>
        </Form>
    );
};

export default CreateBlogForm;
