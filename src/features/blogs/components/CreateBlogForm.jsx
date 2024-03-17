import {useCreateBlogMutation} from "../blogApi.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useGetAllCategoriesQuery} from "../../categories/categoriesApi.js";
import {CustomBtn, FormLabel, Loader} from "@/components/index.js";
import {setAlertMessage} from "@/core/globalSlice.js";
import {Form, Input, Select, Upload} from "antd";
import {MdOutlineFileUpload} from "react-icons/md";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";

const CreateBlogForm = () => {
    const {currentUser: user} = useCurrentUser();
    const [form] = Form.useForm();
    const [createBlog, {isLoading: isCreating}] = useCreateBlogMutation();
    const nav = useNavigate();
    const {data: categories, isLoading, isFetching} = useGetAllCategoriesQuery();
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        const blogImage = values?.image?.file || null;
        delete values.image;

        const blogData = {...values, userId: user?._id};
        let formData = new FormData();
        formData.append("blogData", JSON.stringify(blogData));
        formData.append("blogImage", blogImage);

        try {
            const {data, error} = await createBlog(formData);
            console.log(data, error)
            if (data) {
                dispatch(setAlertMessage({type: "success", content: "Your blog has been published successfully!"}))
                nav("/");
            } else {
                dispatch(setAlertMessage({type: "error", content: error?.data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const supportedFileType = [".jpg", ".jpeg", ".png", ".webp"]
    const uploadProps = {
        // fileList : fileList,
        beforeUpload: () => false,
        accept: [...supportedFileType],
        maxCount: 1,
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
                <Loader/>
            </div>
        );
    }

    // return <QuillEditor/>

    return (
        <section className=" w-full">
            <div className={`max-w-4xl w-full mx-auto`}>
                <h2 className="form-tlt mb-8 "> Create New Blog </h2>
                {/*<QuillEditor/>*/}
                <Form form={form} layout={"vertical"} onFinish={onSubmit}>
                    <div className={`flex flex-col md:flex-row items-start justify-between md:gap-6`}>
                        <Form.Item label={<FormLabel label={"title"}/>} name={"title"} rules={[
                            {required: true, message: "Blog title is required!"}
                        ]} className={`w-full`}>
                            <Input placeholder={"Enter blog title"}/>
                        </Form.Item>
                        <Form.Item label={<FormLabel label={"category"}/>} name={"categoryId"} rules={[
                            {required: true, message: "Category is required!"}
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
                        <Form.Item label={<FormLabel label={"Photo/Image"} isOptional={true}/>} name={"image"}
                                   rules={[{validator: imageValidator}]} className={`w-full`}>
                            <Upload {...uploadProps} className={`!w-full bg-darkTer `}>
                                <button type={"button"}
                                        className={`flex items-center gap-1 h-10 px-4 rounded-md border border-gray-300 hover:border-blue-500 bg-white w-full duration-200`}>
                                    <MdOutlineFileUpload className={`text-xl text-gray-600`}/>Click to Upload
                                </button>
                            </Upload>
                        </Form.Item>
                    </div>
                    <Form.Item label={<FormLabel label={"content"}/>} name={"description"} rules={[
                        {required: true, message: "Blog content is required!"},
                        {min: 50, message: "Blog content must be at least 50 characters!"}
                    ]}>
                        <Input.TextArea bordered={true} placeholder={"Enter your blog content"}
                                        autoSize={{minRows: 8, maxRows: 12}} showCount={true} minLength={50}/>
                    </Form.Item>
                    <div className={`py-3`}></div>
                    <CustomBtn htmlType={"submit"} loading={isCreating} className={"w-full"}>
                        Publish Now
                    </CustomBtn>
                </Form>
            </div>
        </section>
    );

    return (
        <section className=" w-full">
            <div className="common-card">
                <h2 className="form-tlt mb-8 "> Create New Blog </h2>
                <Form form={form} layout={"vertical"} onFinish={onSubmit}>
                    <Form.Item label={<FormLabel label={"title"}/>} name={"title"} rules={[
                        {required: true, message: "Blog title is required!"}
                    ]}>
                        <Input placeholder={"Enter blog title"}/>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"category"}/>} name={"categoryId"} rules={[
                        {required: true, message: "Category is required!"}
                    ]}>
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
                    <Form.Item label={<FormLabel label={"Photo/Image"} isOptional={true}/>} name={"image"}
                               rules={[{validator: imageValidator}]}>
                        <Upload {...uploadProps} className={`!w-full bg-darkTer `}>
                            <button type={"button"}
                                    className={`flex items-center gap-1 h-10 px-4 rounded-md border border-gray-300 hover:border-blue-500 bg-white w-full duration-200`}>
                                <MdOutlineFileUpload className={`text-xl text-gray-600`}/>Click to Upload
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"content"}/>} name={"description"} rules={[
                        {required: true, message: "Blog content is required!"},
                        {min: 50, message: "Blog content must be at least 50 characters!"}
                    ]}>
                        <Input.TextArea bordered={true} placeholder={"Enter your blog content"}
                                        autoSize={{minRows: 7, maxRows: 10}} showCount={true} minLength={50}/>
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
