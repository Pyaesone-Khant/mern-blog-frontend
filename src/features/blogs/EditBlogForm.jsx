import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "./blogApi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, SubmitBtn, ErrorMsg } from "@/components";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";

const EditBlogForm = () => {
    const { blogId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, isLoading, isFetching } = useGetBlogByIdQuery(blogId);
    const currentBlog = data?.data;

    const [updateBlog] = useUpdateBlogMutation();
    const nav = useNavigate();
    const dispatch = useDispatch()

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
                dispatch(setAlertMessage({type : "success", content : data?.message}))
            } else {
                setIsSubmitting(false);
                dispatch(setAlertMessage({type : "error", content : data?.message}))
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
            <div className="common-card">
                <h2 className="form-tlt"> Create New Blog </h2>

                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    {/* title */}
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
                                        "First letter of the title must be capital !",
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
                        <ErrorMsg message={errors.title?.message} />
                    </div>
                    {/* content / description */}
                    <div className="mb-5">
                        <label htmlFor="description">Content</label>
                        <textarea
                            rows={7}
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
                        <ErrorMsg message={errors.description?.message} />
                    </div>
                    <SubmitBtn isSubmitting={isSubmitting} label="Save" />
                </form>
            </div>
        </section>
    );
};

export default EditBlogForm;
