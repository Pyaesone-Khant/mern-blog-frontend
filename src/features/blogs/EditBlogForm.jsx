import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "./blogApi";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/components";
import { Loader } from "@/components";

const EditBlogForm = () => {
    const { blogId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");

    const { data, isLoading, isFetching } = useGetBlogByIdQuery(blogId);
    const currentBlog = data?.data;

    const [updateBlog] = useUpdateBlogMutation();
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const onSubmit = async (data) => {
        const updatedBlogData = {
            ...data,
            id: currentBlog?._id,
            userId: currentBlog?.userId,
        };
        try {
            setIsSubmitting(true);
            const { data } = await updateBlog(updatedBlogData);
            if (data?.success) {
                setIsSubmitting(false);
                nav("/");
            } else {
                setIsSubmitting(false);
                setApiError(data?.message);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            setValue("title", currentBlog?.title);
            setValue("description", currentBlog?.description);
        }
    }, [currentBlog]);

    if (isLoading || isFetching) {
        return (
            <div className="w-full flex items-center justify-center ">
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
                                pattern: {
                                    value: /^\b([A-Z])+[\w -!$_.]*/,
                                    message:
                                        "First letter of the content must be capital !",
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
                            !isSubmitting ? "" : "disabled"
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : "Save"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditBlogForm;
