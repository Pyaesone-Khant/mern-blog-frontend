import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateBlogMutation } from "./blogApi";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components";
import { useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../categories/categoriesApi";
import { Loader } from "@/components";

const CreateBlogForm = () => {
    const [canSave, setCanSave] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");
    const { user } = useSelector((state) => state.auth);
    const [createBlog] = useCreateBlogMutation();
    const nav = useNavigate();
    const [selectedOpt, setSelectedOpt] = useState("");

    const { data, isLoading, isFetching } = useGetAllCategoriesQuery();
    const categories = data?.data;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const formData = watch();

    const onSubmit = async (data) => {
        const blogData = { ...data, userId: user?._id };
        try {
            setIsSubmitting(true);
            const { data } = await createBlog(blogData);
            //console.log(data);
            if (data?.success) {
                setIsSubmitting(false);
                nav("/");
            } else {
                setIsSubmitting(false);
                setApiError(data?.error?._message || data?.message);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        if (formData.title && formData.description && formData.categoryId) {
            setCanSave(true);
            setSelectedOpt(formData.categoryId);
        } else {
            setCanSave(false);
        }
    }, [formData]);

    if (isLoading || isFetching) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <section className=" w-full">
            <div className="p-5 rounded-md shadow-md max-w-2xl w-full border bg-white mx-auto">
                <h2 className="form-tlt"> Create New Blog </h2>

                {apiError ? (
                    <p className=" p-3 rounded-md bg-red-700/60 border border-red-500 text-white  my-5">
                        {" "}
                        {apiError}{" "}
                    </p>
                ) : (
                    ""
                )}
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            {...register("title", {
                                required: {
                                    value: true,
                                    message: "Blog title is required!",
                                },
                                minLength: {
                                    value: 5,
                                    message:
                                        "Blog title must have at least 5 characters!",
                                },
                            })}
                            id="title"
                            className={`form-input ${
                                errors.title?.message ? "input-error" : ""
                            }`}
                        />
                        <p className="error"> {errors.title?.message} </p>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="categoryId">Category</label>
                        <select
                            defaultValue={selectedOpt}
                            {...register("categoryId", {
                                required: {
                                    value: true,
                                    message: "Blog's categoryId is required!",
                                },
                            })}
                            id="categoryId"
                            className={`form-input ${
                                errors.categoryId?.message ? "input-error" : ""
                            }`}
                        >
                            <option disabled={true} value={""}>
                                {" "}
                                Select Category{" "}
                            </option>
                            {categories?.map((item) => {
                                return (
                                    <option key={item._id} value={item._id}>
                                        {item.title}
                                    </option>
                                );
                            })}
                        </select>
                        <p className="error"> {errors.categoryId?.message} </p>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="description">Content</label>
                        <textarea
                            rows={5}
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Blog content is required!",
                                },
                                pattern: {
                                    value: /^\b([A-Z])+[\w -!$_.]*/,
                                    message:
                                        "First letter of the content must be capital !",
                                },
                                minLength: {
                                    value: 20,
                                    message:
                                        "Blog content must have at least 20 characters!",
                                },
                            })}
                            id="description"
                            className={`form-input resize-none ${
                                errors.description?.message ? "input-error" : ""
                            }`}
                        ></textarea>
                        <p className="error"> {errors.description?.message} </p>
                    </div>
                    <button
                        className={`btn submit-btn ${
                            canSave && !isSubmitting ? "" : "disabled"
                        }`}
                        disabled={!canSave || isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : "Create"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateBlogForm;
